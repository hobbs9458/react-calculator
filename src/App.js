import { useReducer } from 'react';
import DigitButton from './DigitButton';

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'add-digit',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evaluate',
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      return {
        ...state,
        currentOperand: `${state.currentOperand || ''}${payload.digit}`,
      };
    default:
      return null;
  }
};

function App() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  );

  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">
          {previousOperand} {operation}
        </div>
        <div className="current-operand">{currentOperand}</div>
      </div>
      <button className="span-two">AC</button>
      <button>DEL</button>
      <button>÷</button>
      <DigitButton dispatch={dispatch} digit="1"></DigitButton>
      <DigitButton dispatch={dispatch} digit="2"></DigitButton>
      <DigitButton dispatch={dispatch} digit="3"></DigitButton>
      <button>*</button>
      <DigitButton dispatch={dispatch} digit="4"></DigitButton>
      <DigitButton dispatch={dispatch} digit="5"></DigitButton>
      <DigitButton dispatch={dispatch} digit="6"></DigitButton>
      <button>+</button>
      <DigitButton dispatch={dispatch} digit="7"></DigitButton>
      <DigitButton dispatch={dispatch} digit="8"></DigitButton>
      <DigitButton dispatch={dispatch} digit="9"></DigitButton>
      <button>-</button>
      <button className="btn-bottom-left">.</button>
      <DigitButton dispatch={dispatch} digit="0"></DigitButton>
      <button className="span-two btn-bottom-right">=</button>
    </div>
  );
}

export default App;
