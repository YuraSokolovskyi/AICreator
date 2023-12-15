import React, {useCallback, useState} from "react";
import './Flow.css'
import ReactFlow, {
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
} from 'reactflow';

import 'reactflow/dist/style.css';
import FlowRightClickMenu from "./FlowRightClickMenu.jsx";
import DenseLayer from "./layers/Dense.jsx";
import Conv2DLayer from "./layers/Conv2D.jsx";
import MaxPoolingLayer from "./layers/MaxPooling.jsx";
import FlattenLayer from "./layers/Flatten.jsx";
import InputLayer from "./layers/Input.jsx";
import {layers} from "./LayersData.js";

let layerIndex = 0

const nodeTypes = {
    Dense: DenseLayer,
    Conv2D: Conv2DLayer,
    MaxPooling: MaxPoolingLayer,
    Flatten: FlattenLayer,
    Input: InputLayer
}

function GenerateSequence(nodes, edges){
    // find start node (Flatten)
    const startNode = nodes.find(n => n.type === "Input")

    // list of sorted id's
    let ids = startNode !== undefined ? [startNode.id] : []
    let next = edges.find(i => i.source === startNode.id)
    while (next !== undefined){
        ids.push(next.target)
        next = edges.find(i => i.source === next.target)
    }

    return ids
}

function GeneratePythonTensorFlow(nodes, edges){
    console.log(nodes)
    console.log(edges)
    let ids = GenerateSequence(nodes, edges)

    let code = "model = tf.keras.models.Sequential()\n"

    for (let id of ids){
        let node = nodes.find(n => n.id === id)
        console.log(node)
        switch (node.type){
            case "Input":
                code += `model.add(tf.keras.layers.Input(shape=(${node.data.inputShape})))\n`
                break
            case "Flatten":
                code += "model.add(tf.keras.layers.Flatten())\n"
                break
            case "Dense":
                code += `model.add(tf.keras.layers.Dense(units=${node.data.units}, activation='${node.data.activation}'))\n`
                break
            case "Conv2D":
                code += "model.add(tf.keras.layers.Conv2D())\n"
                break
            case "MaxPooling":
                code += "model.add(tf.keras.layers.MaxPooling())\n"
                break
        }
    }

    console.log(code)
    return code
}

export function Flow(){
    const FlowHeaderHeight = 150;

    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    // context menu
    const [menuOpened, setMenuOpened] = useState(false)
    const [menuPosition, setMenuPosition] = useState({top: 0, left: 0})

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );

    const onMenuItemSelected = (id, x, y) => {
        setMenuOpened(false)
        addLayer(id, x, y)
    }

    const addLayer = (id, x, y) => {
        setNodes((eds) => eds.concat({
            id: `${layerIndex}`,
            position: {x: x, y: y},
            type: layers.find(i => i.id === id).name,
            data: { id: id }
        }))
        layerIndex += 1
    }

    return (
        <div className="Container">
            <div style={{height: `${FlowHeaderHeight}px`}} className="FlowHeader">
                <button className={"GeneratePythonTensorFlow"} onClick={
                    (e) => GeneratePythonTensorFlow(nodes, edges)}
                >TensorFlow</button>
            </div>
            <div className={"FlowContainer"} style={{height: FlowHeaderHeight}}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    nodeTypes={nodeTypes}
                    onContextMenu={(e) => {
                        e.preventDefault()
                        setMenuOpened(true)
                        setMenuPosition({top: e.clientY - FlowHeaderHeight, left: e.clientX})
                    }}
                    onClick={(e) => {
                        setMenuOpened(false)
                    }}
                    onMoveStart={(e) => {
                        setMenuOpened(false)
                    }}
                >
                    <Background variant="dots" gap={12} size={1}/>
                </ReactFlow>

                <FlowRightClickMenu
                    isOpen={menuOpened}
                    top={menuPosition.top}
                    left={menuPosition.left}
                    onMenuItemSelected={onMenuItemSelected}
                />
            </div>
        </div>
    );
}