import React from 'react';

import './style.css';

import ICONS_ARROW from 'react-icons/lib/md/arrow-forward';

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
};
const supportsTransitions = checkTransitionsSupport();

// generates a unique id
const randomID = () => {
    const id = Math.random().toString(36).substr(2, 9);
    if (document.getElementById(id)) {
        return randomID();
    }

    return id;
};

class Question extends React.PureComponent {
    render () {
        const {
            children = [],
            onChange = function () {console.error('warning you didnt ass an onChange handler')},
            type = "text",
            key
        } = this.props

        return (
            <li key={key}>
                <span>
                    <label htmlFor={key}>
                        {children}
                    </label>
                </span>

                <input id={key} name={key} onChange={onChange} type={type} />
            </li>
        )
    }
}

class EurekaForm extends React.PureComponent {
    constructor(props) {
        super(props);
        const { questions = [], children } = props
        const stateQuestions = questions.map((question, i) => (
            <Question type={question.inputType}>
                {question.title}
            </Question>
        )).concat(children)

        this.questionRefs = {}
        this.state = {
            questions: stateQuestions,
            current: 0,
            values: {},
            wasSubmitted: false
        };
    }

    _updateQuestions(callback = () => {}) {
        const childQuestions = React.Children.map(this.props.children, (child, i) => ({
            type: child.props.type || `eureka-question-${i}`
        }))
        const values = (this.props.questions || [])
            .concat(childQuestions)
            .reduce((acc, cur) => Object.assign({}, acc, {
                [cur.type]: undefined
            }), {})
        this.setState({
            ...this.state,
            values,
            questionsCount: this.state.questions.length
        }, callback);
    }

    componentDidMount() {
        this._updateQuestions(() => {
            // show first question
            this.props.onUpdate(this.state)

            // next question control
            this.ctrlNext = this.formRef.querySelector('button.next');
            this.ctrlNext.setAttribute('aria-label', 'Next');

            // // progress bar
            this.progress = this.formRef.querySelector('div.progress');
            
            // // set progressbar attributes
            this.progress.setAttribute('role', 'progressbar');
            this.progress.setAttribute('aria-readonly', 'true');
            this.progress.setAttribute('aria-valuemin', '0');
            this.progress.setAttribute('aria-valuemax', '100');
            this.progress.setAttribute('aria-valuenow', '0');

            // // question number status
            this.questionStatus = this.formRef.querySelector('span.number');

            // // give the questions status an id
            this.questionStatus.id = this.questionStatus.id || randomID();

            // checks for HTML5 Form Validation support
            // a cleaner solution might be to add form validation to the custom Modernizr script
            this.supportsHTML5Forms = typeof document.createElement("input").checkValidity === 'function';

            // init events
            this._initEvents();
            this.questionRefs[this.state.current].focus()
        });
    }

    _initEvents() {
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

    _validateHTML5() {
	if (this.supportsHTML5Forms) {
	    const input = this.state.questions[this.state.current].querySelector('input, textarea, select');
	    // clear any previous error messages
	    input.setCustomValidity('');

	    // checks input against the validation constraint
	    if (!input.checkValidity()) {
		// Optionally, set a custom HTML5 valiation message
		// comment or remove this line to use the browser default message
                //input.setCustomValidity('Whoops, that\'s not an email address!');

		// display the HTML5 error message
                this._showError(input.validationMessage);

		// prevent the question from changing
		return false;
	    }
	}
        return true
    }

    _nextQuestionFinish(currentQuestion) {
        {
            // update progress bar
            this._progress();
            this.props.onUpdate(this.state)

            if(!this.isFilled) {
                // add class "show-next" to form element (start animations)
                this.formRef.classList.add('show-next');
            }

            // after animation ends, remove class "show-next" from form element and change current question placeholder
            const self = this;
            const onEndTransitionFn = ev => {
                if (supportsTransitions) {
                    this.progress.removeEventListener("transitionend", onEndTransitionFn);
                }

                if(self.isFilled) {
                    this._submit();
                } else {
                    this.formRef.classList.remove('show-next');
                }
                this.questionRefs[this.state.current].focus()
            };

            // onEndTransitionFn();

            if (supportsTransitions) {
                this.progress.addEventListener("transitionend", onEndTransitionFn);
            }
            else {
                onEndTransitionFn();
            }
        }
    }

    _nextQuestion() {
	if(!this._validate()) {
	    return false;
        }

	// checks HTML5 validation
        if (! this._validateHTML5()) {
            return false
        }

	// check if form is filled
	if (this.state.current === this.state.questionsCount - 1) {
	    this.isFilled = true;
	}

        // clear any previous error messages
	this._clearError();

        this.setState(state => ({
            ...state,
            // increment current question iterator
	    current: ++state.current
        }), () => this._nextQuestionFinish());
    }

    // updates the progress bar by setting its width
    _progress() {
	const currentProgress = this.state.current * ( 100 / this.state.questionsCount );
        this.progress.style.width = currentProgress + '%';

	// update the progressbar's aria-valuenow attribute
        this.progress.setAttribute('aria-valuenow', currentProgress);
    }

    _validate() {
        if (!this.state.questions[this.state.current]) {
            return false;
        }

	// current question´s input
	const input = this.state.questions[this.state.current].querySelector('input, textarea, select').value;
	if (input === '') {
            this._showError('EMPTYSTR');

	    return false;
	}

	return true;
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

        this.setState({
            error: message
        })
    }

    _clearError() {
        this.setState({
            error: null
        })
    }

    _change(key) {
        return function (value) {
            const { questions, current } = this.state

            const newState = {
                ...this.state,
                values: {
                    ...this.state.values,
                    [key]: value
                }
            }
            this.setState(newState)
            console.error('this', this.state)
        }
    }

    _submit() {
        if (!this.state.wasSubmitted) {
            this.setState({
                ...this.state,
                wasSubmitted: true
            }, () => {
                // Remove next button
                this.ctrlNext.style.display = "none";

                // Call the custom onSubmit function
                this.props.onSubmit(this.formRef, this.state.values);
            });
        }
    }

    render() {
        const { current, error, questions, questionsCount } = this.state
        const { className = "" } = this.props
        let customClass = className + " ";


        return (
            <form id={this.props.id} className={customClass + "simform"} ref={formRef => this.formRef = formRef}>
                <div className="simform-inner">
                    <ol className="questions">
                        {questions && React.Children.map(questions, (child, i) => {
                             const key = child.props.type || `eureka-question-${i}`
                             return React.cloneElement(child, {
                                 onChange: this._change(key).bind(this),
                                 key
                             })
                        })}
                    </ol>

                    <button className="submit" type="submit">Send answers</button>

                    <div className="controls">
                        <button className="next">
                            <ICONS_ARROW />
                        </button>

                        <div className="progress"></div>

                        <span className="number">
                            <Number value={current + 1}/>
                            <span className="number-total">{questionsCount}</span>
                        </span>

                        {error && <span className="error-message">{error}</span>}
                    </div>
                </div>
            </form>
        )
    }
}

EurekaForm.defaultProps = {
    onUpdate: function () {}
}

module.exports = { EurekaForm, Question };
