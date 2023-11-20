// eslint-disable-next-line no-unused-vars
import React, {useCallback, useMemo, useState} from "react";
import './App.css'
import ReactFlow, {
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
} from 'reactflow';
import DenseNode from "./layers/Dense.jsx";
import 'reactflow/dist/style.css';
import FlowRightClickMenu from "./FlowRightClickMenu.jsx";

const initialNodes = [
    { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
    { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
    { id: '3', type: "denseNode", position: { x: 200, y: 100 } },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

const nodeTypes = {denseNode: DenseNode}

function App() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

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

    }

    return (
        <div style={{ width: '100vw', height: '100vh', position: "relative" }}>
        {/*<div style={{ width: '600px', height: '600px' }}>*/}
            <ReactFlow
                nodeTypes={nodeTypes}
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
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
                <Background variant="dots" gap={12} size={1} />
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
