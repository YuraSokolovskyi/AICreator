import React, {useCallback, useEffect} from "react";
import {Handle, Position} from "reactflow";
import "./Layers.css"
import {layers, activations} from "./../LayersData.js";
import {LayerHandle} from "./LayerHandle.jsx";
import NumberInput from "./utils/NumberInput.jsx";
import SelectInput from "./utils/SelectInput.jsx";

function DenseLayer({data, isConnectable}) {
    const defaultData = {
        units: 0,
        activation: "relu"
    }

    for (let i in defaultData){
        if (!data[i]) data[i] = defaultData[i]
    }

    return (
        <div className={"LayerContainer"}>
            <LayerHandle type={"target"} position={Position.Left}/>
            <div>
                <div className="LayerTitleContainer">
                    <img src={layers.find(i => i.id === data.id).img} alt="" className={"LayerTitleImg"}/>
                    <p className="LayerTitleText">Dense</p>
                </div>
                <div className="LayerSettingsContainer">
                    <div className="LayerProp">
                        <p className="LayerSettingsName">Units</p>
                        <NumberInput
                            min={0}
                            defaultValue={defaultData.units}
                            onChange={(value) => data.units = value}
                            isInteger={true}
                        />
                    </div>

                    <div className="LayerProp">
                        <p className="LayerSettingsName">Activation</p>
                        <SelectInput
                            values={activations.map(activation => <option key={activation.id} name={activation.name}>{activation.name}</option>)}
                            defaultValue={defaultData.activation}
                            onChange={(value) => data.activation = value}
                        />
                    </div>
                </div>
            </div>
            <LayerHandle type={"source"} position={Position.Right}/>
        </div>
    )
}

export default DenseLayer
