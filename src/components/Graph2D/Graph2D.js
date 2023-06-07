import { useEffect, useRef } from "react";

import Graph2dComponent from "../../modules/Graph2d/Graph2dComponent";
import useCanvas from "../../modules/Graph2d/useCanvas";
import Graph2dUI from "./setting/Graph2dUI";

const Graph2D = () => {
    const height = 800;
    const width = window.innerWidth * 0.95;
    const prop = width / height;

    const WIN = {
        left: -10 * prop,
        bottom: -10,
        width: 20 * prop,
        height: 20
    };

    const canvas = useRef(null);
    const graph2D = useRef(null);
    const Canvas = useCanvas((() => renderGraph()))

    const funcs = [];

    const zoom = 1;
    let canMove = false;
    let mousePosX = 0;
    let mousePosY = 0;

    useEffect(() => {

       canvas.current = Canvas({
            WIN: WIN,
            id: "Canvas2d",
            width: window.innerWidth-10,
            height: 800,
            callbacks: {wheel,
                mouseUp,
                mouseDown,
                mouseMove,
                mouseLeave,
            }
        });


       graph2D.current = new Graph2dComponent(WIN, canvas.current);

        return () => {
            canvas.current = null;
        }

    })



    const mouseUp = () => {
        canMove=false;
    };

    const mouseDown = () => {
        canMove=true;
    };

    const mouseMove = (event) => {
        if (canMove){
            WIN.left -= canvas.current.sx(event.movementX);
            WIN.bottom -= canvas.current.sy(event.movementY);
        }

        mousePosY = WIN.bottom + canvas.current.sy(event.offsetY);
        mousePosX = WIN.left + canvas.current.sx(event.offsetX);
    };

    const mouseLeave = () => {
        canMove = false;
    };

    const wheel = (event) =>  {
        const delta = (event.wheelDelta > 0) ? -zoom : zoom;
        if (WIN.width + delta * prop > 0 && WIN.height + delta > 0) {
            WIN.width += delta * prop;
            WIN.height += delta;
            WIN.left -= prop * delta / 2;
            WIN.bottom -= delta / 2;
        }
    };

    const renderGraph = () => {
        if(canvas.current) {
            canvas.current.clear();
            graph2D.current.printOXY();
            graph2D.current.printNums();

            funcs.forEach(func => {
                if (func) {
                    const { color, width, a, b, showDerevative, showIntegral} = func;
                    let f;
                    try {
                        eval(`f = function (x) {return ${func.func}}`);
                    } catch (e) {
                        console.log(e);
                    }

                    if (f) {
                        graph2D.current.printFunction(f, color, width);
                        if (showDerevative) {
                            graph2D.current.printDerivative(f, mousePosX);
                        }

                        if ((a || b) && a !== b) {
                            if (showIntegral) {
                                if (a > b) {
                                    graph2D.current.printIntegral(f, b, a, graph2D.current.getIntegral(f, b, a));
                                } else {
                                    graph2D.current.printIntegral(f, a, b, graph2D.current.getIntegral(f, a, b));
                                }
                            }

                            if (graph2D.current.getZero(f, a, b) !== null) {
                                canvas.current.point(graph2D.current.getZero(f, a, b), 0);
                            }
                        }
                    }

                }

            });
            canvas.current.render();

        }
    }

    const delFunction = (num) => {
        funcs[num] = null;
    }



    return(<div className='Graph2D'>
        <Graph2dUI funcs={funcs} delFunc={delFunction} />
        <canvas id='Canvas2d'></canvas>
    </div> );
}

export default Graph2D;