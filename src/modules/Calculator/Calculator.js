import Calc from './Calc.js';

const Calculator = (refA, refB, refC) => {
    const calc = new Calc;
    return(event) => {
        const a = calc.getEntity(refA.current.value);
        const b = calc.getEntity(refB.current.value);
        const c = calc[event](a, b);
        refC.current.value = c.toString();
    }
}

export default Calculator;