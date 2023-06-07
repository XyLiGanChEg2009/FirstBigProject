import './addButton.css'

const addButton = ({onClick = () => { }}) => {
    return(
        <div className='addButtonContent'>
            <div className='addButton' onClick={onClick}> Добавить </div>
        </div>
    );
}

export default addButton;