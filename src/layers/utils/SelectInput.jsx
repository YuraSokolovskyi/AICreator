import React, {useCallback} from "react";
import {activations} from "../../LayersData.js";

function NumberInput({values, defaultValue, classNames="", onChange}){
    const onValueChange = (e) => {
        onChange(e.target.value)
    }

    return (
        <>
            <select
                name="activations"
                className={`${classNames} LayerComboParam nodrag`}
                defaultValue={defaultValue}
                onChange={onValueChange}
            >
                {values}
            </select>
        </>
    )
}

export default NumberInput