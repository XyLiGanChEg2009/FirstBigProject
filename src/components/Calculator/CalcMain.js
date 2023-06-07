import { useRef } from "react";
import Calculator from "../../modules/Calculator/Calculator";
import CalcAnswer from "./Answer/CalcAnswer";
import CalcInputs from "./CalculatorInputs/calcInputs";
import BlockOfOperands from "./Operands/BlockOfOpperands";
import "./CalcMain.css"

const CalcMain = () => {
    const refInputA = useRef(null);
    const refInputB = useRef(null);
    const refAnswer = useRef(null);

    const calc = Calculator(refInputA, refInputB, refAnswer);

    const operandsButtons = [
        {
            operand: 'add',
            text: '+',
        },
        {
            operand: 'sub',
            text: '-',
        },
        {
            operand: 'mult',
            text: '*',
        },
        {
            operand: 'div',
            text: '/',
        },
        {
            operand: 'prod',
            text: 'sc',
        },
        {
            operand: 'pow',
            text: '^',
        },
    ];

    return (
        <div className="calculatorContent">
            <CalcInputs inputA={refInputA} inputB={refInputB} />
            <CalcAnswer answer={refAnswer} />
            <BlockOfOperands onClick={calc} operandButtons={operandsButtons} />
        </div>);

}


export default CalcMain;

