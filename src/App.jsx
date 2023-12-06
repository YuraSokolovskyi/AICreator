import React, {useCallback, useState} from "react";
import './App.css'
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

let layerIndex = 0

const nodeTypes = {
    Dense: DenseLayer,
    Conv2D: Conv2DLayer,
    MaxPooling: MaxPoolingLayer,
}

function App() {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    // context menu
    const [menuOpened, setMenuOpened] = useState(false)
    const [menuPosition, setMenuPosition] = useState({top: 0, left: 0})

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );

    const onMenuItemSelected = (id) => {
        setMenuOpened(false)
        addLayer(id)
    }

    const addLayer = (id) => {
        let type = "Dense"

        switch (id) {
            case 1:
                type = "Dense"
                break
            case 2:
                type = "Conv2D"
                break
            case 3:
                type = "MaxPooling"
                break
        }

        setNodes((eds) => eds.concat({
            id: `${layerIndex}`,
            position: {x: 200, y: 200},
            type: type,
            data: { id: id }
        }))
        layerIndex += 1
        console.log(nodes)
    }

    return (
        <div style={{width: '100vw', height: '100vh', position: "relative"}}>
            {/*<div style={{ width: '600px', height: '600px' }}>*/}
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
                    setMenuPosition({top: e.nativeEvent.offsetY, left: e.nativeEvent.offsetX})
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
    );
}

export default App
