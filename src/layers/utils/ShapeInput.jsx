import React, {useCallback} from "react";

function ShapeInput({defaultValue="", classNames="", onChange}){
    const onValueChange = (e) => {
        onChange(e.currentTarget.value)
    }

    return (
        <>
            <input
                className={`${classNames} LayerShapeParam nodrag`}
                type="text"
                defaultValue={defaultValue}
                onChange={onValueChange}
            />
        </>
    )
}

export default ShapeInput