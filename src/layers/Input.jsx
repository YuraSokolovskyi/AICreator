import React, {useCallback} from "react";
import {Handle, Position} from "reactflow";
import "./Layers.css"
import {layers, activations} from "./../LayersData.js";
import {LayerHandle} from "./LayerHandle.jsx";
import ShapeInput from "./utils/ShapeInput.jsx";

function InputLayer({data, isConnectable}) {
    const defaultData = {
        inputShape: "",
    }

    for (let i in defaultData){
        if (!data[i]) data[i] = defaultData[i]
    }

    return (
        <div className={"LayerContainer"}>
            <div>
                <div className="LayerTitleContainer">
                    <img src={layers.find(i => i.id === data.id).img} alt="" className={"LayerTitleImg"}/>
                    <p className="LayerTitleText">Input</p>
                </div>
                <div className="LayerSettingsContainer">
                    <div className="LayerProp">
                        <p className="LayerSettingsName">Input Shape</p>
                        <ShapeInput
                            onChange={value => data.inputShape = value}
                        />
                    </div>
                </div>
            </div>
            <LayerHandle type={"source"} position={Position.Right}/>
        </div>
    )
}

export default InputLayer
