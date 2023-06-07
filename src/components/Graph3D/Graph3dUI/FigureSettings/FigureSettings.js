import { useState } from "react";

import SceneBlock from "./SceneBlock/SceneBlock";
import FigureList from "./FigureList/FigureList";

const FiguresSetting = ({
                            addFigure,
                            showHideAddList,
                            figuresList,
                            showAddList,
                            scene,
                            figuresCallbacks,
                            deleteFigure
                        }) => {

    const [figureCounter, setFigureCounter] = useState(0);

    const addFigureOnClickHandler = (figure) => {
        addFigure(figure, figureCounter + 1);
        setFigureCounter(figureCounter + 1);
    }

    return (
        <div className="figures-setting">
            <div className="add-figure-block">
                <button
                    className="add-figure-button"
                    onClick={showHideAddList}>Выбрать фигуру</button>
                {showAddList ? <FigureList
                        figures={figuresList}
                        onClick={addFigureOnClickHandler}
                    /> :
                    <></>
                }
            </div>
            <SceneBlock
                scene={scene}
                figuresCallbacks={figuresCallbacks}
                deleteFigure={deleteFigure}
            />
        </div>
    )
}

export default FiguresSetting;