import { useRef, useEffect } from "react";
import CheckBox from "../../CheckBox/CheckBox";

const FuncBlock = ({func, delFunc}) => {

    const refFunc = useRef(null);
    const refWidth = useRef(null);
    const refColor = useRef(null);
    const refA = useRef(null);
    const refB = useRef(null);

    useEffect(() => {
        refFunc.current.value = func.func ? func.func : '';
        refWidth.current.value = func.width;
        refColor.current.value = func.color;
        refA.current.value = func.a ? func.a : '';
        refB.current.value = func.b ? func.b : '';
    })

    const derivativeHandler = (value) => {
        func.showDerivative = value;
    }

    const integralHandler = (value) => {
        func.showIntegral = value;
    }

    const functionHandler = (event) => {
        func.func = event.target.value;
    }

    const widthHandler = (event) => {
        func.width = event.target.value - 0;
    }

    const colorHandler = (event) => {
        func.color = event.target.value;
    }

    const aHandler = (event) => {
        func.a = event.target.value - 0;
    }

    const bHandler = (event) => {
        func.b = event.target.value - 0;
    }

    const deleteFuncHandler = () => {
        delFunc(func.index);
    }

    return (
        <>
            <CheckBox
                text={"Производная"}
                onClick={derivativeHandler}
                checked={func.showDerivative}
            />

            <input
                placeholder='f(x)'
                className='input-func'
                onChange={functionHandler}
                ref={refFunc}
            />

            <input
                type='number'
                placeholder='Ширина'
                className='input-width'
                onChange={widthHandler}
                ref={refWidth}
            />

            <input
                type='color'
                className='input-color'
                onChange={colorHandler}
                ref={refColor}
            />

            <CheckBox
                text="Интеграл"
                onClick={integralHandler}
                checked={func.showIntegral}
            />

            <input
                placeholder='a'
                className='input-integral'
                onChange={aHandler}
                ref={refA}
            />

            <input
                placeholder='b'
                className='input-integral'
                onChange={bHandler}
                ref={refB}
            />

            <button
                className='delete-func-button'
                onClick={deleteFuncHandler}
            >x</button>
        </>
    );

}

export default FuncBlock;