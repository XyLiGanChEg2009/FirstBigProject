import './calcButton.css';

const Button = ({onClick, text}) => {
    return(
        <div onClick = {onClick} className = "calcButton"> {text} </div>
    );
}

export default Button;