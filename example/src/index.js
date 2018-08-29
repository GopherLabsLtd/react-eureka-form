import React from 'react';
import ReactDOM from 'react-dom';
import { EurekaForm, Question, Number } from '../../build';

class InputQuestion extends Question {
    render() {
        const { onChange, type, children } = this.props
        return (
            <div>
                <span>{children}</span>
                <input onChange={onChange} type={type}/>
            </div>
        )
    }
}

class ListQuestion extends Question {
    render() {
        const { options, onChange, children } = this.props
        return (
            <ul>
                <h1>{children}</h1>
                { options.map((opt, i) => (
                    <li key={i} onClick={() => onChange(opt)}>{opt}</li>
                ))}
            </ul>
        )
    }
}

const doStuff = (values) => console.log('submitted', values)

const MyForm = ({values = {}}) => (
    <EurekaForm onSubmit={doStuff}>
        <InputQuestion type='name'>
            What's your name ?
        </InputQuestion>
        <ListQuestion type='country' options={['Argentina', 'Brazil', 'Canada']}>
            Hello <b>{values.name}</b>, and your country ?
        </ListQuestion>
    </EurekaForm>
)

ReactDOM.render(<MyForm />, document.getElementById('root'));
