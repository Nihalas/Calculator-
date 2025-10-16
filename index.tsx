import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

const App = () => {
  const [display, setDisplay] = useState('0');

  const handleButtonClick = (value: string) => {
    if (value === 'C') {
      setDisplay('0');
    } else if (value === '=') {
      try {
        // Using a function constructor for safer evaluation than direct eval
        const result = new Function(`return ${display}`)();
        if (!isFinite(result)) {
            setDisplay('Error');
        } else {
            // Round to a reasonable number of decimal places to avoid floating point issues
            setDisplay(String(parseFloat(result.toFixed(10))));
        }
      } catch (error) {
        setDisplay('Error');
      }
    } else {
      if (display === '0' || display === 'Error') {
        setDisplay(value);
      } else {
        setDisplay(display + value);
      }
    }
  };

  const buttons = [
    'C', '/', '*', '-',
    '7', '8', '9', '+',
    '4', '5', '6',
    '1', '2', '3', '=',
    '0', '.'
  ];

  const isOperator = (val: string) => isNaN(parseInt(val)) && val !== '.' && val !== 'C' && val !== '=';

  return (
    <div className="calculator-container">
      <main className="calculator">
        <div className="display" aria-live="polite">{display}</div>
        <div className="buttons">
          {buttons.map((btn) => {
             const classNames = [
                'btn',
                isOperator(btn) ? 'operator' : '',
                btn === '=' ? 'equal' : '',
                btn === '0' ? 'zero' : '',
                btn === 'C' ? 'clear' : ''
            ].join(' ').trim();

            return (
              <button key={btn} onClick={() => handleButtonClick(btn)} className={classNames} aria-label={btn === 'C' ? 'Clear' : `Button ${btn}`}>
                {btn}
              </button>
            );
          })}
        </div>
      </main>
    </div>
  );
};

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);
