# React Eureka [![npm](https://img.shields.io/npm/v/react-eureka.svg)](https://www.npmjs.com/package/react-eureka) [![npm](https://img.shields.io/npm/dm/react-eureka.svg)](https://www.npmjs.com/package/react-eureka)

<img src="./src/logo.png" style="width: 250px">

A minimalistic form wizard component for React

[See Demo](https://eureka.gopher.it)

## Installation
```sh
npm install --save react-eureka
```

## How to Use:
```js
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
| questions      | array    | `[{ title: "What's your email?", inputType: "email" }, { title: "Where do you live?", }]`                                           |
| autoFocus      | boolean  | true                                                  |
| onUpdate       | function | `(state) => this.setState(state);`    |
| onSubmit       | function | `() => console.log("Make API calls!");`    |

## Credits
The implementation of the component is based on the work of 
[Mary Lou from Tympanus](https://tympanus.net/Development/MinimalForm/)

Logo is made by [Patrick Morrison](http://www.patrickmorrison.co.uk/)
