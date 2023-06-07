import './FigureList.css';

const FigureList = ({ figures, onClick }) => {
    return (
        <div className='figures-list'>
            {figures.map((figure, index) => {
                return (
                    <div
                        key={index}
                        onClick={() => onClick(figure.name)}
                        className='figure-button'>
                        {figure.text}
                    </div>
                )
            })}
        </div>
    )
}

export default FigureList;