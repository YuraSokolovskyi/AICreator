import React, {createRef, useCallback, useState} from "react";
import './App.css'
import {Flow} from "./Flow.jsx";
import {useEdgesState, useNodesState} from "reactflow";

function App() {
    return (
        <Flow/>
    );
}

export default App
