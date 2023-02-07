import { useReducer } from 'react';
import DigitButton from './DigitButton';
import OperationButton from './OperationButton';

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evaluate',
};

const evaluate = (state) => {
  const previous = parseInt(state.previousOperand);
  const current = parseInt(state.currentOperand);

  if (isNaN(previous) || isNaN(current)) return '';

  let computation = '';

  switch (state.operation) {
    case '+':
      computation = previous + current;
      break;
    case '-':
      computation = previous - current;
      break;
    case '*':
      computation = previous * current;
      break;
    case '÷':
      computation = previous / current;
  }

  console.log(computation);
  return computation.toString();
};

const INTEGER_FORMATTER = new Intl.NumberFormat('en-us', {
  maximumFractionDigits: 0,
});

function formatOperand(operand) {
  if (operand == null) return;
  const [integer, decimal] = operand.split('.');
  if (decimal == null) return INTEGER_FORMATTER.format(integer);
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`;
}

const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        };
      }
      if (payload.digit === '0' && state.currentOperand === '0') {
        return state;
      }
      if (payload.digit === '.' && state.currentOperand.includes('.') === '.') {
        return state;
      }
      return {
        ...state,
        currentOperand: `${state.currentOperand || ''}${payload.digit}`,
      };

    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand == null) {
        return state;
      }

      if (state.previousOperand == null) {
        return {
          ...state,
          previousOperand: state.currentOperand,
          currentOperand: null,
          operation: payload.operation,
        };
      }

      if (state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation,
        };
      }

      return {
        ...state,
        previousOperand: evaluate(state),
        currentOperand: null,
        operation: payload.operation,
        overwrite: true,
      };

    case ACTIONS.CLEAR:
      return {};

    case ACTIONS.EVALUATE:
      if (
        state.currentOperand == null ||
        state.previousOperand == null ||
        state.operation == null
      )
        return state;

      return {
        ...state,
        currentOperand: evaluate(state),
        previousOperand: null,
        operation: null,
        overwrite: true,
      };
    case ACTIONS.DELETE_DIGIT: {
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: null,
          overwrite: false,
        };
      }

      if (state.currentOperand == null) return state;
      if (state.currentOperand.length === 1) {
        return {
          ...state,
          currentOperand: null,
        };
      }
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      };
    }

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
          {formatOperand(previousOperand)} {operation}
        </div>
        <div className="current-operand">{formatOperand(currentOperand)}</div>
      </div>

      <button
        className="span-two"
        onClick={() => dispatch({ type: ACTIONS.CLEAR })}
      >
        AC
      </button>
      <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>
        DEL
      </button>
      <OperationButton dispatch={dispatch} operation="÷"></OperationButton>
      <DigitButton dispatch={dispatch} digit="1"></DigitButton>
      <DigitButton dispatch={dispatch} digit="2"></DigitButton>
      <DigitButton dispatch={dispatch} digit="3"></DigitButton>
      <OperationButton dispatch={dispatch} operation="*"></OperationButton>
      <DigitButton dispatch={dispatch} digit="4"></DigitButton>
      <DigitButton dispatch={dispatch} digit="5"></DigitButton>
      <DigitButton dispatch={dispatch} digit="6"></DigitButton>
      <OperationButton dispatch={dispatch} operation="+"></OperationButton>
      <DigitButton dispatch={dispatch} digit="7"></DigitButton>
      <DigitButton dispatch={dispatch} digit="8"></DigitButton>
      <DigitButton dispatch={dispatch} digit="9"></DigitButton>
      <OperationButton dispatch={dispatch} operation="-"></OperationButton>
      <DigitButton
        className="btn-bottom-left"
        dispatch={dispatch}
        digit="."
      ></DigitButton>
      <DigitButton dispatch={dispatch} digit="0"></DigitButton>
      <button
        onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
        className="span-two btn-bottom-right"
      >
        =
      </button>
    </div>
  );
}

export default App;
