import React, {useCallback} from "react";
import {Handle, Position} from "reactflow";
import "./Layers.css"
import {layers, activations} from "./../LayersData.js";

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
                    <div className="LayerProp">
                        <p className="LayerSettingsName">Nodes</p>
                        <input type="number" className="LayerNumberParam nodrag" defaultValue={0} min={0}/>
                    </div>

                    <div className="LayerProp">
                        <p className="LayerSettingsName">Activation</p>
                        <select name="activations" id="denseActivations" className={"LayerComboParam nodrag"}>
                            {activations.map(activation => <option key={activation.id} name={activation.name}>{activation.name}</option>)}
                        </select>
                    </div>
                </div>
            </div>
            <Handle type={"source"} position={Position.Right} isConnectable={isConnectable}/>
        </div>
    )
}

export default DenseLayer
