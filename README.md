# React Eureka [![npm](https://img.shields.io/npm/v/react-eureka.svg)](https://www.npmjs.com/package/react-eureka) [![npm](https://img.shields.io/npm/dm/react-eureka.svg)](https://www.npmjs.com/package/react-eureka)
A minimalistic form wizard component for React

## Installation
```sh
npm install --save react-eureka
```

## How to Use:
```js
import React, { Component } from 'react';

import { EurekaForm } from 'react-eureka';

const questions = [
  {
    title: "What's your email?",
    inputType: "email"
  },
  {
    title: "Where do you live?",
  },
  {
    title: "What time do you go to work?",
  },
  {
    title: "How do you like your veggies?",
  },
  {
    title: "What book inspires you?",
  },
  {
    title: "What's your profession?",
  },
];

class EurekaDemo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formSubmitted: false
    };
  }

  render() {
    const { formSubmitted } = this.state;

    return (
      <div>
        {!formSubmitted &&
          <EurekaForm
            id="my-form"
            className="my-custom-class"
            questions={questions}
            autoFocus={true}
            onSubmit={el => {
              this.setState({
                ...this.state,
                formSubmitted: true
              });
            }}
          />
        }

        {formSubmitted &&
          <div>
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
| questions      | array    | `[{ title: "What's your email?", inputType: "email" }, { title: "Where do you live?", }]`                                           |
| autoFocus      | boolean  | true                                                  |
| onSubmit       | function | `(element, values) => console.log(values);`    |

## Credits
The implementation of the component is based on the work of 
[Mary Lou from Tympanus](https://tympanus.net/Development/MinimalForm/)

Logo is made by [Patrick Morrison](http://www.patrickmorrison.co.uk/)