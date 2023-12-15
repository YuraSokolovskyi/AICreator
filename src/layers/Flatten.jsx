import React, {useCallback} from "react";
import {Handle, Position} from "reactflow";
import "./Layers.css"
import {layers, activations} from "./../LayersData.js";
import {LayerHandle} from "./LayerHandle.jsx";

function FlattenLayer({data, isConnectable}) {
    return (
        <div className={"LayerContainer"}>
            <LayerHandle type={"target"} position={Position.Left}/>
            <div>
                <div className="LayerTitleContainer">
                    <img src={layers.find(i => i.id === data.id).img} alt="" className={"LayerTitleImg"}/>
                    <p className="LayerTitleText">Flatten</p>
                </div>
            </div>
            <LayerHandle type={"source"} position={Position.Right}/>
        </div>
    )
}

export default FlattenLayer
