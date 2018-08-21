# React Eureka [![npm](https://img.shields.io/npm/v/react-eureka.svg)](https://www.npmjs.com/package/react-eureka) [![npm](https://img.shields.io/npm/dm/react-eureka.svg)](https://www.npmjs.com/package/react-eureka)

<img src="./src/logo.png" style="width: 250px">

A minimalistic form wizard component for React

[See Demo](https://eureka.gopher.it)

## Installation
```sh
npm install --save react-eureka
```

## How to Use:
```jsx
import React, { Component } from 'react';

import { EurekaForm, Question } from 'react-eureka';

class EurekaDemo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      current: -1,
      values: {},
      formSubmitted: false
    };
  }

  _onSubmit = () => this.setState({...this.state, formSubmitted: true})

  render() {
    const { formSubmitted, values } = this.state;

    return (
      <div>
        {!formSubmitted &&
          <EurekaForm autoFocus
            onSubmit={this._onSubmit}
            onUpdate={(state) => this.setState(state)}>
            <span type='name'>
              What's your name
            </span>

            <Question type='email'>
              Hello <b>{values.name}</b>, and your email?
            </Question>

            <Question type='tel'>
              Phone Number?
            </Question>
          </EurekaForm>
        }

        {formSubmitted &&
          <div className="submit-message">
            Thank you for your response!
          </div>
        }
      </div>
    );
  }
}

export default EurekaDemo;
```

## Props
| name           | type     | example                                                    |
| -------------- | -------- | ---------------------------------------------------------- |
| id             | string   | "my-custom-id" |
| className      | string   | "my-custom-class my-2nd-class"                             |
| questions      | array    | `[{ key: "email", title: "What's your email?", inputType: "email" }, { key: "address", title: "Where do you live?", }]`                                           |
| autoFocus      | boolean  | true                                                  |
| onUpdate       | function | `(state) => this.setState(state);`    |
| onSubmit       | function | `({values}) => console.log("Make API calls!");`    |

## onSubmit()
will get you back an object with your answers, if you gave keys to your questions (see below how to do that),
they will be named, if not they will come back as `eureka-question-${i}`

there are 2 APIs you can use (you can actually use both, but we don't recomend it),
in the questions API you pass your questions as a JSON object.
in the React children API you pass the components you want to display as your questions.

## questions array API

```js
const questions = [{
      key: "email", // how you want your answered to be named in the values object
      title: "What's your email?", // the text you want displayed
      inputType: "email" // this is pristinely passed as the HTML form type,
                         // used for validation and error messages
}, {
      key: "address",
      title: "Where do you live?"
}]
```

```jsx
<EurekaForm questions={questions} onSubmit={doStuff}/>
```

## React Component API
*Note:* **The type prop sets both the HTML form type and the key in the
values object**
each child you give to EurekaForm will be treated as a `question`, the
easiest way is to use the `Question` helper we provide.

### Question Helper
```jsx
<EurekaForm onSubmit={doStuff}>
      <Question type='name'>
        What's your name
      </Question>
      <Question type='email'>
        Hello <b>{values.name}</b>, and your email?
      </Question>
      <Question type='tel'>
        Phone Number?
      </Question>
</EurekaForm>
```

### Full API
In order to implement your own Question Helper you just need to call
`onChange` when your value changes, if you are going to use an `<input/>`
tag, please pass down the `type` property to make sure HTML5 validation
still works. You should also make sure to gracefully handle the `children`
prop, as it'll be usual to pass down the question component there.

```jsx
const InputQuestion = ({ onChange, type, children }) => (
    <div>
        <span>{children}</span>
            <input onChange={onChange} type={type}/>
    </div>
)

const ListQuestion = ({ options, onChange, children }) => (
    <ul>
        <h1>{children}</h1>
            { options.map(opt, i => (
                <li key={i} onClick={() => onChange(opt)}>{opt}</li>
            )}
    </ul>
)

const MyForm = ({values = {}}) => (
    <EurekaForm onSubmit={doStuff}>
        <InputQuestion type='name'>
          What's your name ?
        </Question>
        <ListQuestion type='country' options={['Argentina', 'Brazil', 'Canada']}>
          Hello <b>{values.name}</b>, and your country ?
        </Question>
    </EurekaForm>
)
```
    
## Credits
The implementation of the component is based on the work of 
[Mary Lou from Tympanus](https://tympanus.net/Development/MinimalForm/)

Logo is made by [Patrick Morrison](http://www.patrickmorrison.co.uk/)
