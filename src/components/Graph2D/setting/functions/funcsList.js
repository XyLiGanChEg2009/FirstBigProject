import funcBlock from "./funcBlock/funcBlock";
import FuncBlock from "./funcBlock/funcBlock";
import './FuncList.css'

const FuncsList = ({ list, delFunc }) => {
    return(
        <div className='funcList'>
            {list.map((func, index) => {
                return(
                    <div key={index} className={funcBlock}>
                        <FuncBlock func={func} delFunc={delFunc} />
                    </div>
                );

            })}
        </div>
    )
}
export default FuncsList;