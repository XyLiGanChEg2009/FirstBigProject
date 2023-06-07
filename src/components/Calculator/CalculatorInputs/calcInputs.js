import './calcInputs.css';



const CalcInputs = ({inputA, inputB}) => {
    return(<div className="calc-inputs">
            <textarea placeholder="a" ref = {inputA}></textarea>
            <textarea placeholder="b" ref = {inputB}></textarea>
            </div>);
}

export default CalcInputs;