import "./CalcAnswer.css"
const CalcAnswer = ({ answer }) => {
    return(
        <div className="calcAnswerContent">
            <textarea className="calcAnswer" disabled ref = {answer}></textarea>
        </div> 
    );
}

export default CalcAnswer;