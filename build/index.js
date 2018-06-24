module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 17);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(18);

var _react2 = _interopRequireDefault(_react);

__webpack_require__(19);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var checkTransitionsSupport = function checkTransitionsSupport() {
    var b = document.body || document.documentElement;
    var s = b.style;
    var p = 'transition';

    if (typeof s[p] == 'string') {
        return true;
    }

    // Tests for vendor specific prop
    var v = ['Moz', 'webkit', 'Webkit', 'Khtml', 'O', 'ms'];
    p = p.charAt(0).toUpperCase() + p.substr(1);

    for (var i = 0; i < v.length; i++) {
        if (typeof s[v[i] + p] == 'string') {
            return true;
        }
    }

    return false;
};
var supportsTransitions = checkTransitionsSupport();

// generates a unique id
var randomID = function randomID() {
    var id = Math.random().toString(36).substr(2, 9);
    if (document.getElementById(id)) {
        return randomID();
    }

    return id;
};

var EurekaForm = function (_React$Component) {
    _inherits(EurekaForm, _React$Component);

    function EurekaForm(props) {
        _classCallCheck(this, EurekaForm);

        var _this = _possibleConstructorReturn(this, (EurekaForm.__proto__ || Object.getPrototypeOf(EurekaForm)).call(this, props));

        _this.state = {
            current: 0,
            questions: [],
            wasSubmitted: false
        };
        return _this;
    }

    _createClass(EurekaForm, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            var questions = [].slice.call(this.formRef.querySelectorAll('ol.questions > li'));
            this.setState(_extends({}, this.state, {
                questions: questions,
                questionsCount: questions.length

            }), function () {
                // show first question
                _this2.state.questions[0].classList.add('current');

                // next question control
                _this2.ctrlNext = _this2.formRef.querySelector('button.next');
                _this2.ctrlNext.setAttribute('aria-label', 'Next');

                // // progress bar
                _this2.progress = _this2.formRef.querySelector('div.progress');

                // // set progressbar attributes
                _this2.progress.setAttribute('role', 'progressbar');
                _this2.progress.setAttribute('aria-readonly', 'true');
                _this2.progress.setAttribute('aria-valuemin', '0');
                _this2.progress.setAttribute('aria-valuemax', '100');
                _this2.progress.setAttribute('aria-valuenow', '0');

                // // question number status
                _this2.questionStatus = _this2.formRef.querySelector('span.number');

                // // give the questions status an id
                _this2.questionStatus.id = _this2.questionStatus.id || randomID();

                // associate "x / y" with the input via aria-describedby
                for (var i = _this2.state.questions.length - 1; i >= 0; i--) {
                    var formElement = _this2.state.questions[i].querySelector('input, textarea, select');
                    formElement.setAttribute('aria-describedby', _this2.questionStatus.id);
                };

                // // current question placeholder
                _this2.currentNum = _this2.questionStatus.querySelector('span.number-current');
                _this2.currentNum.innerHTML = Number(_this2.state.current + 1);

                // // total questions placeholder
                _this2.totalQuestionNum = _this2.questionStatus.querySelector('span.number-total');
                _this2.totalQuestionNum.innerHTML = _this2.state.questionsCount;

                // // error message
                _this2.error = _this2.formRef.querySelector('span.error-message');

                // checks for HTML5 Form Validation support
                // a cleaner solution might be to add form validation to the custom Modernizr script
                _this2.supportsHTML5Forms = typeof document.createElement("input").checkValidity === 'function';

                // init events
                _this2._initEvents();
            });
        }
    }, {
        key: '_initEvents',
        value: function _initEvents() {
            var _this3 = this;

            // first input
            var firstElInput = this.state.questions[this.state.current].querySelector('input, textarea, select');

            // focus
            var onFocusStartFn = function onFocusStartFn() {
                firstElInput.removeEventListener('focus', onFocusStartFn);

                _this3.ctrlNext.classList.add('show');
            };

            // show the next question control first time the input gets focused
            firstElInput.addEventListener('focus', onFocusStartFn);

            // show next question
            this.ctrlNext.addEventListener('click', function (ev) {
                ev.preventDefault();

                _this3._nextQuestion();
            });

            // pressing enter will jump to next question
            this.formRef.addEventListener('keydown', function (ev) {
                var keyCode = ev.keyCode || ev.which;

                // enter
                if (keyCode === 13) {
                    ev.preventDefault();

                    _this3._nextQuestion();
                }
            });
        }
    }, {
        key: '_nextQuestion',
        value: function _nextQuestion() {
            var _this4 = this;

            if (!this._validate()) {
                return false;
            }

            // checks HTML5 validation
            if (this.supportsHTML5Forms) {
                var input = this.state.questions[this.state.current].querySelector('input, textarea, select');
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
            var currentQuestion = this.state.questions[this.state.current];

            this.setState(_extends({}, this.state, {
                // increment current question iterator
                current: ++this.state.current
            }), function () {
                // update progress bar
                _this4._progress();

                var nextQuestion = void 0;

                if (!_this4.isFilled) {
                    // change the current question number/status
                    _this4._updateQuestionNumber();

                    // add class "show-next" to form element (start animations)
                    _this4.formRef.classList.add('show-next');

                    // remove class "current" from current question and add it to the next one
                    // current question
                    nextQuestion = _this4.state.questions[_this4.state.current];
                    currentQuestion.classList.remove('current');
                    nextQuestion.classList.add('current');
                }

                // after animation ends, remove class "show-next" from form element and change current question placeholder
                var self = _this4;
                var onEndTransitionFn = function onEndTransitionFn(ev) {
                    if (supportsTransitions) {
                        _this4.progress.removeEventListener("transitionend", onEndTransitionFn);
                    }

                    if (self.isFilled) {
                        _this4._submit();
                    } else {
                        _this4.formRef.classList.remove('show-next');

                        _this4.currentNum.innerHTML = _this4.nextQuestionNum.innerHTML;
                        _this4.questionStatus.removeChild(_this4.nextQuestionNum);

                        // force the focus on the next input
                        nextQuestion.querySelector('input, textarea, select').focus();
                    }
                };

                // onEndTransitionFn();

                if (supportsTransitions) {
                    _this4.progress.addEventListener("transitionend", onEndTransitionFn);
                } else {
                    onEndTransitionFn();
                }
            });
        }

        // updates the progress bar by setting its width

    }, {
        key: '_progress',
        value: function _progress() {
            var currentProgress = this.state.current * (100 / this.state.questionsCount);
            this.progress.style.width = currentProgress + '%';

            // update the progressbar's aria-valuenow attribute
            this.progress.setAttribute('aria-valuenow', currentProgress);

            console.log(this.progress);
        }
    }, {
        key: '_validate',
        value: function _validate() {
            if (!this.state.questions[this.state.current]) {
                return false;
            }

            // current question´s input
            var input = this.state.questions[this.state.current].querySelector('input, textarea, select').value;
            if (input === '') {
                this._showError('EMPTYSTR');

                return false;
            }

            return true;
        }
    }, {
        key: '_updateQuestionNumber',
        value: function _updateQuestionNumber() {
            // first, create next question number placeholder
            this.nextQuestionNum = document.createElement('span');
            this.nextQuestionNum.className = 'number-next';
            this.nextQuestionNum.innerHTML = Number(this.state.current + 1);

            // insert it in the DOM
            this.questionStatus.appendChild(this.nextQuestionNum);
        }
    }, {
        key: '_showError',
        value: function _showError(err) {
            var message = '';
            switch (err) {
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
    }, {
        key: '_clearError',
        value: function _clearError() {
            this.error.classList.remove('show');
        }
    }, {
        key: '_submit',
        value: function _submit() {
            var _this5 = this;

            if (!this.state.wasSubmitted) {
                this.setState(_extends({}, this.state, {
                    wasSubmitted: true
                }), function () {
                    _this5.props.options.onSubmit(_this5.formRef);
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this6 = this;

            var questions = this.props.options.questions;

            var customClass = "";

            if (this.props.className) {
                customClass = this.props.className + " ";
            }

            return _react2.default.createElement(
                'form',
                { id: this.props.id, className: customClass + "simform", ref: function ref(formRef) {
                        return _this6.formRef = formRef;
                    } },
                _react2.default.createElement(
                    'div',
                    { className: 'simform-inner' },
                    _react2.default.createElement(
                        'ol',
                        { className: 'questions' },
                        questions.map(function (question, i) {
                            return _react2.default.createElement(
                                'li',
                                null,
                                _react2.default.createElement(
                                    'span',
                                    null,
                                    _react2.default.createElement(
                                        'label',
                                        { htmlFor: 'q' + i },
                                        question.title
                                    )
                                ),
                                _react2.default.createElement('input', { id: 'q' + i, name: 'q' + i, type: question.inputType || "text" })
                            );
                        })
                    ),
                    _react2.default.createElement(
                        'button',
                        { className: 'submit', type: 'submit' },
                        'Send answers'
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'controls' },
                        _react2.default.createElement(
                            'button',
                            { className: 'next' },
                            'Next'
                        ),
                        _react2.default.createElement('div', { className: 'progress' }),
                        _react2.default.createElement(
                            'span',
                            { className: 'number' },
                            _react2.default.createElement('span', { className: 'number-current' }),
                            _react2.default.createElement('span', { className: 'number-total' })
                        ),
                        _react2.default.createElement('span', { className: 'error-message' })
                    )
                ),
                _react2.default.createElement('span', { className: 'final-message' })
            );
        }
    }]);

    return EurekaForm;
}(_react2.default.Component);

module.exports = { EurekaForm: EurekaForm };

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(20);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(22)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!./style.css", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!./style.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(21)(false);
// imports


// module
exports.push([module.i, ".simform {\n\tposition: relative;\n\tmargin: 0 auto;\n\tpadding: 2em 0;\n\tmax-width: 860px;\n\twidth: 100%;\n\ttext-align: left;\n\tfont-size: 2.5em;\n}\n\n.simform .submit {\n\tdisplay: none;\n}\n\n/* Question list style */\n.simform ol {\n\tmargin: 0;\n\tpadding: 0;\n\tlist-style: none;\n\tposition: relative;\n\t-webkit-transition: height 0.4s;\n\ttransition: height 0.4s;\n}\n\n.simform ol:before {\n\tcontent: '';\n\tbackground-color: rgba(0,0,0,0.1);\n\tposition: absolute;\n\tleft: 0;\n\tbottom: 0;\n\twidth: 100%;\n\theight: 2.35em;\n}\n\n.questions li {\n\tz-index: 100;\n\tposition: relative;\n\tvisibility: hidden;\n\theight: 0;\n\t-webkit-transition: visibility 0s 0.4s, height 0s 0.4s;\n\ttransition: visibility 0s 0.4s, height 0s 0.4s;\n}\n\n.questions li.current,\n.no-js .questions li {\n\tvisibility: visible;\n\theight: auto;\n\t-webkit-transition: none;\n\ttransition: none;\n}\n\n/* Labels */\n.questions li > span {\n\tdisplay: block;\n    overflow: hidden;\n    margin-bottom: 0.8em;\n}\n\n.questions li > span label {\n\tdisplay: block;\n\t-webkit-transition: -webkit-transform 0.4s;\n\ttransition: transform 0.4s;\n\t-webkit-transform: translateY(-100%);\n\ttransform: translateY(-100%);\n}\n\n.questions li.current > span label,\n.no-js .questions li > span label {\n\t-webkit-transition: none;\n\ttransition: none;\n\t-webkit-transform: translateY(0);\n\ttransform: translateY(0);\n}\n\n.show-next .questions li.current > span label {\n\t-webkit-animation: moveUpFromDown 0.4s both;\n\tanimation: moveUpFromDown 0.4s both;\n}\n\n@-webkit-keyframes moveUpFromDown {\n\tfrom { -webkit-transform: translateY(100%); }\n\tto { -webkit-transform: translateY(0); }\n}\n\n@keyframes moveUpFromDown {\n\tfrom { -webkit-transform: translateY(100%); transform: translateY(100%); }\n\tto { -webkit-transform: translateY(0); transform: translateY(0); }\n}\n\n/* Input field */\n.questions input {\n\tdisplay: block;\n    margin: 0.3em 0 0 0;\n    padding: 0.2em 1em 0.5em 0.7em;\n    width: calc(100% - 2em);\n    border: none;\n    background: transparent;\n    color: rgba(0,0,0,0.8);\n    font-size: 1em;\n    line-height: 1;\n    opacity: 0;\n    -webkit-transition: opacity 0.3s;\n    transition: opacity 0.3s;\n    /* height: 2.1em; */\n}\n\n.questions .current input,\n.no-js .questions input {\n\topacity: 1;\n}\n\n.questions input:focus,\n.simform button:focus {\n\toutline: none;\n}\n\n/* Next question button */\n.next {\n\tposition: absolute;\n\tright: 0;\n\tbottom: 2.15em; /* padding-bottom of form plus progress bar height */\n\tdisplay: block;\n\tpadding: 0;\n\twidth: 2em;\n\theight: 2em;\n\tborder: none;\n\tbackground: none;\n\tcolor: rgba(0,0,0,0.4);\n\ttext-align: center;\n\topacity: 0;\n\tz-index: 100;\n\tcursor: pointer;\n\t-webkit-transition: -webkit-transform 0.3s, opacity 0.3s;\n\ttransition: transform 0.3s, opacity 0.3s;\n\t-webkit-transform: translateX(-20%);\n\ttransform: translateX(-20%);\n\tpointer-events: none;\n\t-webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n}\n\n.next:hover {\n\tcolor: rgba(0,0,0,0.5);\n}\n\n.next::after {\n\tposition: absolute;\n\ttop: 0;\n\tleft: 0;\n\twidth: 100%;\n\theight: 100%;\n\tcontent: \"\\E600\";\n\ttext-transform: none;\n\tfont-weight: normal;\n\tfont-style: normal;\n\tfont-variant: normal;\n\tfont-family: 'icomoon';\n\tline-height: 2;\n\tspeak: none;\n\t-webkit-font-smoothing: antialiased;\n\t-moz-osx-font-smoothing: grayscale;\n}\n\n.next.show {\n\topacity: 1;\n\t-webkit-transform: translateX(0);\n\ttransform: translateX(0);\n\tpointer-events: auto;\n}\n\n/* Progress bar */\n.simform .progress {\n\twidth: 0%;\n\theight: 0.15em;\n\tbackground: rgba(0,0,0,0.3);\n\t-webkit-transition: width 0.4s ease-in-out;\n\ttransition: width 0.4s ease-in-out;\n}\n\n.simform .progress::before {\n\tposition: absolute;\n\ttop: auto;\n\twidth: 100%;\n\theight: inherit;\n\tbackground: rgba(0,0,0,0.05);\n\tcontent: '';\n}\n\n/* Number indicator */\n.simform .number {\n\tposition: absolute;\n\tright: 0;\n\toverflow: hidden;\n\tmargin: 0.4em 0;\n\twidth: 3em;\n\tfont-weight: 700;\n\tfont-size: 0.4em;\n}\n\n.simform .number:after {\n\tposition: absolute;\n\tleft: 50%;\n\tcontent: '/';\n\topacity: 0.4;\n\t-webkit-transform: translateX(-50%);\n\ttransform: translateX(-50%);\n}\n\n.simform .number span {\n\tfloat: right;\n\twidth: 40%;\n\ttext-align: center;\n}\n\n.simform .number .number-current {\n\tfloat: left;\n}\n\n.simform .number-next {\n\tposition: absolute;\n\tleft: 0;\n}\n\n.simform.show-next .number-current {\n\t-webkit-transition: -webkit-transform 0.4s;\n\ttransition: transform 0.4s;\n\t-webkit-transform: translateY(-100%);\n\ttransform: translateY(-100%);\n}\n\n.simform.show-next .number-next {\n\t-webkit-animation: moveUpFromDown 0.4s both;\n\tanimation: moveUpFromDown 0.4s both;\n}\n\n/* Error and final message */\n.simform .error-message,\n.simform .final-message {\n\tposition: absolute;\n\tvisibility: hidden;\n\topacity: 0;\n\t-webkit-transition: opacity 0.4s;\n\ttransition: opacity 0.4s;\n}\n\n.simform .error-message {\n\tpadding: 0.4em 3.5em 0 0;\n\twidth: 100%;\n\tcolor: rgba(0,0,0,0.7);\n\tfont-style: italic;\n\tfont-size: 0.4em;\n}\n\n.final-message {\n\ttop: 50%;\n\tleft: 0;\n\tpadding: 0.5em;\n\twidth: 100%;\n\ttext-align: center;\n\t-webkit-transform: translateY(-50%);\n\ttransform: translateY(-50%);\n}\n\n.error-message.show,\n.final-message.show {\n\tvisibility: visible;\n\topacity: 1;\n}\n\n.final-message.show {\n\t-webkit-transition-delay: 0.5s;\n\ttransition-delay: 0.5s;\n}\n\n/* Final hiding of form / showing message */\n.simform-inner.hide {\n\tvisibility: hidden;\n\topacity: 0;\n\t-webkit-transition: opacity 0.3s, visibility 0s 0.3s;\n\ttransition: opacity 0.3s, visibility 0s 0.3s;\n}\n\n/* No JS Fallback */\n.no-js .simform {\n\tfont-size: 1.75em;\n}\n\n.no-js .questions li {\n\tpadding: 0 0 2em;\n}\n\n.no-js .simform .submit {\n\tdisplay: block;\n\tfloat: right;\n\tpadding: 10px 20px;\n\tborder: none;\n\tbackground: rgba(0,0,0,0.3);\n\tcolor: rgba(0,0,0,0.4);\n}\n\n.no-js .simform .controls {\n\tdisplay: none;\n}\n\n/* Remove IE clear cross */\ninput[type=text]::-ms-clear {\n    display: none;\n}\n\n/* Adjust form for smaller screens */\n@media screen and (max-width: 44.75em) {\n\t.simform {\n\t\tfont-size: 1.8em;\n\t}\n}\n\n@media screen and (max-width: 33.5625em) {\n\t.simform {\n\t\tfont-size: 1.2em;\n\t}\n}", ""]);

// exports


/***/ }),
/* 21 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			var styleTarget = fn.call(this, selector);
			// Special case to return head of iframe instead of iframe itself
			if (styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[selector] = styleTarget;
		}
		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(23);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 23 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ })
/******/ ]);