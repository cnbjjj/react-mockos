import React, { useState } from 'react';
import Layout from "../layout/Layout";

function Keypad({ onButtonClick, highlightedOperator }) {
    const buttons = [
        '1', '2', '3', '+',
        '4', '5', '6', '-',
        '7', '8', '9', '*',
        'C', '0', '=', '/'
    ];

    return (
        <ul className="grid gap-4 grid-cols-4 align-middle justify-center mx-auto w-full">
            {buttons.map((button, index) => (
                <li
                    key={index}
                    onClick={() => onButtonClick(button)}
                    style={{ '--delay': index / 100 + 's' }}
                    className={`grid-item number-calc in ${button === highlightedOperator ? 'highlighted' : ''}`}
                >
                    {button}
                </li>
            ))}
        </ul>
    );
}

function Calculator() {
    const [input, setInput] = useState('');
    const [result, setResult] = useState('');
    const [operator, setOperator] = useState(null);
    const [highlightedOperator, setHighlightedOperator] = useState(null);
    const [calculated, setCalculated] = useState(false);

    const padClicked = (buttonValue) => {
        if (buttonValue === '+' || buttonValue === '-' || buttonValue === '*' || buttonValue === '/') {
            if (operator && input) {
                const calculatedResult = eval(`${result} ${operator} ${input}`);
                setResult(calculatedResult);
                setInput('');
            } else {
                setResult(input);
                setInput('');
            }
            setOperator(buttonValue);
            setHighlightedOperator(buttonValue);
            setCalculated(true);
        } else if (buttonValue === '=') {
            if (operator && input) {
                const calculatedResult = eval(`${result} ${operator} ${input}`);
                setResult(calculatedResult);
                setInput('');
                setOperator(null);
                setHighlightedOperator(null);
                setCalculated(true);
            }
        } else if (buttonValue === 'C') {
            setInput('');
            setResult('');
            setOperator(null);
            setHighlightedOperator(null);
        } else {
            if (calculated && !isNaN(buttonValue)) {
                setInput(buttonValue);
                setCalculated(false);
            } else {
                setInput(input + buttonValue);
            }
        }
    };

    return (
        <Layout title='Calculator'>
            <div className='justify-center w-full mx-auto'>
                <div className="mb-8 px-8 w-full h-16 bg-slate-50 bg-opacity-10 text-white text-2xl font-thin rounded-xl flex items-center justify-end overflow-hidden">
                    <div className=''>{calculated ? result : (input || '0')}</div>
                </div>
                <Keypad onButtonClick={padClicked} highlightedOperator={highlightedOperator} />
            </div>
        </Layout>
    );
}
export default Calculator;