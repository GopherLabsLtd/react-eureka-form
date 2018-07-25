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

import { EurekaForm } from 'react-eureka';

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

            <span type='email'>
              Hello <b>{values.name}</b>, and your email?
            </span>

            <span type='tel'>
              Phone Number?
            </span>
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

## questions API

```js
const questions = [{
      key: "email", // how you want your answered to be named in the values object
      title: "What's your email?", // the text you want displayed
      inputType: "email" // this is pristinely passed as the HTML form type,
                         // used for validation and error messages
}, {
      key: "address",
      title: "Where do you live?"
}]`
<EurekaForm questions={questions} onSubmit={doStuff}/>
```

## React children API

```js
<EurekaForm onSubmit={doStuff}>
      <span type='name'> {/* The type is both the HTML form type and the key in the values object */}
        What's your name {/* The actually text that is displayed *}
      </span>
      <span type='email'>
        Hello <b>{values.name}</b>, and your email?
      </span>
      <span type='tel'>
        Phone Number?
      </span>
</EurekaForm>
```

## Credits
The implementation of the component is based on the work of 
[Mary Lou from Tympanus](https://tympanus.net/Development/MinimalForm/)

Logo is made by [Patrick Morrison](http://www.patrickmorrison.co.uk/)
