import React, {useCallback} from "react";

function NumberInput({min, defaultValue, isInteger, classNames="", onChange}){
    const onValueChange = (e) => {
        if (isInteger) e.currentTarget.value = parseInt(e.currentTarget.value)
        const value = e.currentTarget.value
        if (value < min) e.currentTarget.value = min

        onChange(e.currentTarget.value)
    }

    return (
        <>
            <input
                className={`${classNames} LayerNumberParam nodrag`}
                type="number"
                min={min}
                defaultValue={defaultValue}
                onChange={onValueChange}
            />
        </>
    )
}

export default NumberInput