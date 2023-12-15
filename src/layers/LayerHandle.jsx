import {Handle, Position} from "reactflow";

export const LayerHandle = ({type, position}) => (
    <Handle
        type={type}
        position={position}
        style={{
            background: "blue",
            height: "40px",
            width: "10px",
            border: "none",
            borderRadius: "5px"
        }}
    />
)