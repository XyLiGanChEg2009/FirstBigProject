import Button from "../Button/calcButton";
import './BlockOfOperands.css'


const BlockOfOperands = ({operandButtons, onClick}) => {

    return (
        <div className="operands">
            {operandButtons.map((button, index) => {
                return (
                    <div key={index}>
                        <Button onClick={() => onClick(button.operand)} text={button.text} />
                    </div>
                );

            })};
        </div>
    );
}

export default BlockOfOperands;