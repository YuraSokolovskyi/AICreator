import React from "react";
import {layers} from "./LayersData.js";
import "./FlowRightClickMenu.css"

const FlowRightClickMenu = ({isOpen, top, left, onMenuItemSelected}) => {

    return (
        <div className={"FlowRightClickMenu"} style={{
            visibility: isOpen === true ? "visible" : "hidden",
            top: top,
            left: left,
        }}>
            <ul className={"MenuList"}>
                {layers.map((item) => {
                    return (
                        <li
                            key={item.id}
                            className="MenuListItem"
                            onClick={() => {
                                onMenuItemSelected(item.id, left, top)
                            }}
                        >
                            <img src={item.img} alt="" className={"MenuListItemImg"}/>
                            <p className="MenuListItemName">{item.name}</p>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default FlowRightClickMenu
