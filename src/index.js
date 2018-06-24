import React from 'react';

import "./style.css"

const checkTransitionsSupport = () => {
    const b = document.body || document.documentElement;
    const s = b.style;
    let p = 'transition';

    if (typeof s[p] == 'string') {
        return true;
    }

    // Tests for vendor specific prop
    const v = ['Moz', 'webkit', 'Webkit', 'Khtml', 'O', 'ms'];
    p = p.charAt(0).toUpperCase() + p.substr(1);

    for (let i = 0; i < v.length; i++) {
        if (typeof s[v[i] + p] == 'string') {
            return true;
        }
    }

    return false;
}

const supportsTransitions = checkTransitionsSupport();

// generates a unique id
const randomID = () => {
    const id = Math.random().toString(36).substr(2, 9);
    if (document.getElementById(id)) {
        return randomID();
    }

    return id;
};

class EurekaForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            current: 0,
            questions: [],
            wasSubmitted: false
        };
    }

    componentDidMount() {
        const questions = [].slice.call(this.formRef.querySelectorAll( 'ol.questions > li' ));
        this.setState({
            ...this.state,
            questions,
            questionsCount: questions.length,

        }, () => {
            // show first question
            // classie.addClass( this.questions[0], 'current' );

            // next question control
            this.ctrlNext = this.formRef.querySelector( 'button.next' );
            this.ctrlNext.setAttribute( 'aria-label', 'Next' );

            // // progress bar
            this.progress = this.formRef.querySelector( 'div.progress' );
            
            // // set progressbar attributes
            this.progress.setAttribute( 'role', 'progressbar' );
            this.progress.setAttribute( 'aria-readonly', 'true' );
            this.progress.setAttribute( 'aria-valuemin', '0' );
            this.progress.setAttribute( 'aria-valuemax', '100' );
            this.progress.setAttribute( 'aria-valuenow', '0' );

            // // question number status
            this.questionStatus = this.formRef.querySelector('span.number');
            
            // // give the questions status an id
            this.questionStatus.id = this.questionStatus.id || randomID();
            
            // associate "x / y" with the input via aria-describedby
            for (var i = this.state.questions.length - 1; i >= 0; i--) {
                const formElement = this.state.questions[i].querySelector('input, textarea, select');
                formElement.setAttribute('aria-describedby', this.questionStatus.id);
            };
            
            // // current question placeholder
            this.currentNum = this.questionStatus.querySelector('span.number-current');
            this.currentNum.innerHTML = Number(this.state.current + 1);
            
            // // total questions placeholder
            this.totalQuestionNum = this.questionStatus.querySelector('span.number-total');
            this.totalQuestionNum.innerHTML = this.state.questionsCount;

            // // error message
            this.error = this.formRef.querySelector('span.error-message');

            // checks for HTML5 Form Validation support
            // a cleaner solution might be to add form validation to the custom Modernizr script
            this.supportsHTML5Forms = typeof document.createElement("input").checkValidity === 'function';

            // init events
            this._initEvents();
        });
    }

    _initEvents() {
        // first input
        const firstElInput = this.state.questions[this.state.current].querySelector('input, textarea, select');
        
        // focus
        const onFocusStartFn = () => {
            firstElInput.removeEventListener('focus', onFocusStartFn);

            this.ctrlNext.classList.add('show');
        };

		// show the next question control first time the input gets focused
		firstElInput.addEventListener('focus', onFocusStartFn);

		// show next question
		this.ctrlNext.addEventListener('click', ev => {
            ev.preventDefault();

			this._nextQuestion();
		});

		// pressing enter will jump to next question
		this.formRef.addEventListener('keydown', ev => {
            const keyCode = ev.keyCode || ev.which;
            
			// enter
			if(keyCode === 13) {
                ev.preventDefault();
                
                this._nextQuestion();
			}
		});
    }

    _nextQuestion() {
		if(!this._validate()) {
			return false;
        }

		// checks HTML5 validation
		if (this.supportsHTML5Forms) {
			const input = this.state.questions[this.state.current].querySelector('input, textarea, select');
			// clear any previous error messages
			input.setCustomValidity('');

			// checks input against the validation constraint
			if (!input.checkValidity()) {
				// Optionally, set a custom HTML5 valiation message
				// comment or remove this line to use the browser default message
                input.setCustomValidity('Whoops, that\'s not an email address!');
                
				// display the HTML5 error message
                this._showError(input.validationMessage);
                
				// prevent the question from changing
				return false;
			}
		}

		// check if form is filled
		if (this.state.current === this.state.questionsCount - 1) {
			this.isFilled = true;
		}

        // clear any previous error messages
		this._clearError();

		// current question
		const currentQuestion = this.state.questions[this.state.current];

        this.setState({
            ...this.state,
            // increment current question iterator
		    current: ++this.state.current
        }, () => {
            // update progress bar
            this._progress();

            let nextQuestion;

            if(!this.isFilled) {
                // change the current question number/status
                this._updateQuestionNumber();

                // add class "show-next" to form element (start animations)
                this.formRef.classList.add('show-next');

                // remove class "current" from current question and add it to the next one
                // current question
                nextQuestion = this.state.questions[this.state.current];
                currentQuestion.classList.remove('current');
                nextQuestion.classList.add('current');
            }

            // after animation ends, remove class "show-next" from form element and change current question placeholder
            const self = this;
            const onEndTransitionFn = ev => {
                if (supportsTransitions) {
                    this.progress.removeEventListener("transitionend", onEndTransitionFn);
                }

                if(self.isFilled) {
                    this._submit();
                }

                else {
                    this.formRef.classList.remove('show-next');

                    this.currentNum.innerHTML = this.nextQuestionNum.innerHTML;
                    this.questionStatus.removeChild(this.nextQuestionNum);

                    // force the focus on the next input
                    nextQuestion.querySelector('input, textarea, select').focus();
                }
            };

            // onEndTransitionFn();

            if (supportsTransitions) {
                this.progress.addEventListener("transitionend", onEndTransitionFn);
            }
            else {
                onEndTransitionFn();
            }
        });
	}

    // updates the progress bar by setting its width
	_progress() {
		const currentProgress = this.state.current * ( 100 / this.state.questionsCount );
        this.progress.style.width = currentProgress + '%';
        
		// update the progressbar's aria-valuenow attribute
        this.progress.setAttribute('aria-valuenow', currentProgress);
        
        console.log(this.progress);
    }
    
    _validate() {
        if (!this.state.questions[this.state.current]) {
            return false;
        }

		// current question´s input
		const input = this.state.questions[this.state.current].querySelector('input, textarea, select').value;
		if (input === '') {
            this._showError( 'EMPTYSTR' );
            
			return false;
		}

		return true;
    }

    _updateQuestionNumber() {
		// first, create next question number placeholder
		this.nextQuestionNum = document.createElement('span');
		this.nextQuestionNum.className = 'number-next';
        this.nextQuestionNum.innerHTML = Number(this.state.current + 1);
        
		// insert it in the DOM
		this.questionStatus.appendChild(this.nextQuestionNum);
	}
    
    _showError(err) {
		let message = '';
		switch(err) {
			case 'EMPTYSTR':
				message = 'Please fill the field before continuing';
				break;
			case 'INVALIDEMAIL':
				message = 'Please fill a valid email address';
				break;
			// ...
			default:
				message = err;
        };
        
        this.error.innerHTML = message;
        
		this.error.classList.add('show');
    }
    
    _clearError() {
		this.error.classList.remove('show');
    }
    
    _submit() {
        if (!this.state.wasSubmitted) {
            this.setState({
                ...this.state,
                wasSubmitted: true
            }, () => {
                this.props.options.onSubmit(this.formRef);
            });
        }
	}

    render() {
      return (
        <form id="theForm" className="simform" ref={formRef => this.formRef = formRef}>
            <div className="simform-inner">
                <ol className="questions">
                    <li className="current">
                        <span><label htmlFor="q1">What's your email?</label></span>
                        <input id="q1" name="q1" type="email"/>
                    </li>

                    <li>
                        <span><label htmlFor="q2">Where do you live?</label></span>
                        <input id="q2" name="q2" type="text"/>
                    </li>

                    <li>
                        <span><label htmlFor="q3">What time do you go to work?</label></span>
                        <input id="q3" name="q3" type="text"/>
                    </li>

                    <li>
                        <span><label htmlFor="q4">How do you like your veggies?</label></span>
                        <input id="q4" name="q4" type="text"/>
                    </li>

                    <li>
                        <span><label htmlFor="q5">What book inspires you?</label></span>
                        <input id="q5" name="q5" type="text"/>
                    </li>

                    <li>
                        <span><label htmlFor="q6">What's your profession?</label></span>
                        <input id="q6" name="q6" type="text"/>
                    </li>
                </ol>
                
                <button className="submit" type="submit">Send answers</button>

                <div className="controls">
                    <button className="next">
                        Next
                    </button>

                    <div className="progress"></div>

                    <span className="number">
                        <span className="number-current"></span>
                        <span className="number-total"></span>
                    </span>

                    <span className="error-message"></span>
                </div>
            </div>

            <span className="final-message"></span>
        </form>
      )
    }
}

module.exports = { EurekaForm };
