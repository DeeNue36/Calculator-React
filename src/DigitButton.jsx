import { ACTIONS } from './Constants';

export const DigitButton = ({dispatch, digit}) => {
    return (
        <button 
            onClick={() => dispatch({ type: ACTIONS.CLICK_DIGIT, payload: { digit } })}
        >
            {digit}
        </button>
    );
}