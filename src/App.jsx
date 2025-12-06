import { useReducer } from 'react'
import { ACTIONS } from './Constants'
import { DigitButton } from './DigitButton'
import { OperationButton } from './OperationButton'
import './App.css'


function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.CLICK_DIGIT:
      if (payload.digit === "0" && state.currentOperand === "0") { // curly brackets are optional since it could be on a single line
        return state; // do nothing if the digit is 0 and the user tries adding multiple 0s
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


  }
}

function App() {
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
