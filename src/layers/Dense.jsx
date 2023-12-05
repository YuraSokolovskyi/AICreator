import React, {useCallback} from "react";
import {Handle, Position} from "reactflow";
import "./Layers.css"
import {layers} from "./../LayersData.js";

function DenseLayer({data, isConnectable}) {
    return (
        <div className={"LayerContainer"}>
            <Handle type={"target"} position={Position.Left} isConnectable={isConnectable}/>
            <div>
                <div className="LayerTitleContainer">
                    <img src={layers.find(i => i.id === data.id).img} alt="" className={"LayerTitleImg"}/>
                    <p className="LayerTitleText">Dense</p>
                </div>
                <div className="LayerSettingsContainer">
                    <p className="LayerSettingsName">Nodes</p>
                    <input type="number" className="LayerNumberParam nodrag"/>
                </div>
            </div>
            <Handle type={"source"} position={Position.Right} isConnectable={isConnectable}/>
        </div>
    )
}

export default DenseLayer