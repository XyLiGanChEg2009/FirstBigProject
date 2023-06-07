import {useState, useCallback} from "react";

import FuncList from "./functions/funcsList";
import Func from "../../../modules/Graph2d/Func";
import AddButton from "./addButton/addButton";

import './Graph2dUI.css';


const Graph2dUI = ({ funcs, delFunc }) => {

    const [showPanel, setShowPanel] = useState(false);
    const [functionsCount, setFunctionsCount] = useState(0);
    const [deleteFunction, setDeleteFunction] = useState(0);

    const showHidePanel = useCallback(() => {
        setShowPanel(!showPanel);
    }, [setShowPanel, showPanel]);

    const addFunction = useCallback(() => {
        funcs[functionsCount] = new Func({ index: functionsCount });
        setFunctionsCount(functionsCount + 1);
    }, [setFunctionsCount, functionsCount, funcs])

    const deleteFunctionHandler = useCallback((index) => {
        delFunc(index);
        setDeleteFunction(deleteFunction + 1);
    }, [delFunc, setDeleteFunction, deleteFunction]);

    return(
        <div className='Graph2dUI'>
            {showPanel && <div className='funcsMenu'>
                <AddButton onClick={addFunction} />
                <FuncList list={funcs.filter(func => func)} delFunc={deleteFunctionHandler} />
            </div>
            }
            <button onClick={showHidePanel}> {showPanel ? '⇐' : '⇒'} </button>
        </div>
    )

}

export default Graph2dUI;