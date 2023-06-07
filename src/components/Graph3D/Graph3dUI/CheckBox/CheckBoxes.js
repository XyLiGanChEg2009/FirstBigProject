import CheckBox from "../../../Graph2D/setting/CheckBox/CheckBox";

import './CheckBoxes.css'

const CheckBoxes = ({ checkBoxes }) => {
    return (<div className="checkboxes">
            {checkBoxes.map((checkBox, index) => {
                return (
                    <div key={index}>
                        <CheckBox
                            text={checkBox.text}
                            onClick={checkBox.onClick}
                            checked={checkBox.checked}
                        />
                    </div>
                )
            })}
        </div >
    )
}

export default CheckBoxes;