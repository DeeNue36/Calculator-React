import { useReducer } from 'react'
import { ACTIONS } from './Constants'
import { DigitButton } from './DigitButton'
import { OperationButton } from './OperationButton'
import './App.css'


// reducer function takes => (state, action), 
//* STATE: the current state as defined in the App component below
// state has been destructured to take currentOperand, previousOperand and operation properties
// currentOperand: takes the value(s) of the calculator button pressed by the user and displays the digits or used for operations
// previousOperand: takes the value of currentOperand when the user selects an operation, displays the value and the operation symbol and can then be used for calculations along with the currentOperand using the evaluate function
// operation: takes the value of the operation selected by the user
//* ACTION: the object returned from the dispatch function, it's usually an object with a type property identifying the action to be taken by the user and optionally other properties with additional information
// In this case we have destructured the "action" object to take the "type" and "payload" properties
// type: property used to determine the action to be taken by the user
// payload: property used to pass additional information to the reducer function such as the digit or the operation
function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.CLICK_DIGIT:
      if (payload.digit === "0" && state.currentOperand === "0") { // curly brackets are optional since it could be on a single line
        return state; // do nothing if the entered digit is 0 and the user tries adding multiple 0s
      }

      if (payload.digit === "." && state.currentOperand.includes(".")) { 
        return state; // do nothing if the digit is . and the user tries adding multiple decimal points
      }

      return {
        ...state,
        currentOperand: `${state.currentOperand || ''}${payload.digit}`,
      }
    
    case ACTIONS.CLEAR:
      return{}

    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand == null) {
        return state;
      }

      if (state.previousOperand == null) {
        return {
          ...state,
          previousOperand: state.currentOperand, // store the currentOperand as the previousOperand
          operation: payload.operation,
          currentOperand: null, // reset the currentOperand so that it can take new values
        }
      }

        return {
        ...state,
        previousOperand: evaluate(state), // evaluate the previousOperand and the current state i.e currentOperand
        operation: payload.operation,
        currentOperand: null,
      }
  }
}

function evaluate({ currentOperand, previousOperand, operation }) {
  const prevValue = parseFloat(previousOperand);
  const currentValue = parseFloat(currentOperand);

  if (isNaN(prevValue) || isNaN(currentValue)) {
    return '';
  }

  let calcResult = '';

  switch (operation) {
    case '+':
      calcResult = prevValue + currentValue;
      break
    case '—':
      calcResult = prevValue - currentValue;
      break
    case '*':
      calcResult = prevValue * currentValue;
      break
    case '÷':
      calcResult = prevValue / currentValue;
      break
  }

  return calcResult.toString();
}

function App() {
  // useReducer returns an array with the current state and a dispatch function
  // i.e const [state, dispatch] = useReducer(reducer, initialState);
  // the state is the current state of the UI and can be destructured to take multiple properties
  // dispatch function is used to update the state in the UI by calling the reducer function
  // the reducer function takes the current state and the action object and returns the new state
  // the initialState can be left empty or initialized with a default value of any type
  const [{currentOperand, previousOperand, operation}, dispatch] = useReducer(reducer, {});

  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">{previousOperand} {operation}</div>
        <div className="current-operand">{currentOperand}</div>
      </div>

      <button 
        className="span-two" 
        onClick={() => dispatch({ type: ACTIONS.CLEAR })}
      >
        AC
      </button>

      <button>DEL</button>

      <OperationButton operation="÷" dispatch={dispatch}/>

      <DigitButton digit="1" dispatch={dispatch}/>
      <DigitButton digit="2" dispatch={dispatch}/>
      <DigitButton digit="3" dispatch={dispatch}/>

      <OperationButton operation="*" dispatch={dispatch}/>

      <DigitButton digit="4" dispatch={dispatch}/>
      <DigitButton digit="5" dispatch={dispatch}/>
      <DigitButton digit="6" dispatch={dispatch}/>

      <OperationButton operation="+" dispatch={dispatch}/>

      <DigitButton digit="7" dispatch={dispatch}/>
      <DigitButton digit="8" dispatch={dispatch}/>
      <DigitButton digit="9" dispatch={dispatch}/>

      <OperationButton operation="—" dispatch={dispatch}/>

      <DigitButton digit="." dispatch={dispatch}/>
      <DigitButton digit="0" dispatch={dispatch}/>
      <button className="span-two">=</button>
    </div>
  )
}

export default App
