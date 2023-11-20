import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import "./layers.css"

function DenseNode({ data, isConnectable }) {
    const onChange = useCallback((evt) => {
        console.log(evt.target.value);
    }, []);

    return (
        <div
            className="denseNode"
            // onClick={(e) => {e.stopPropagation()}}
        >
            <Handle type="target" position={Position.Left} isConnectable={isConnectable} />
            <div>
                <div className="layerTitle">
                    <img src="src/assets/layers/denseImg.png" alt="" className={"layerTitleImg"}/>
                    <p className="layerTitleName">Dense</p>
                </div>
                <div className="layerSettings">
                    <ul className="layerSettings">
                        <li className={"layerSettingsItem"}>
                            <label className="layerSettingsItemTitle" htmlFor={"units"}>Units:</label>
                            <input type="number" defaultValue={0} id={"units"} name={"units"} className={"layerSettingsItemNumberInput" + " nodrag"}/>
                        </li>
                        <li className={"layerSettingsItem"}>
                            <label className="layerSettingsItemTitle" htmlFor={"activation"}>Activation:</label>
                            <input type="text" defaultValue={"relu"} id={"activation"} name={"activation"} className={"layerSettingsItemNumberInput" + " nodrag"}/>
                        </li>
                    </ul>
                </div>
            </div>
            <Handle type="source" position={Position.Right} isConnectable={isConnectable} />
        </div>
    );
}

export default DenseNode;
