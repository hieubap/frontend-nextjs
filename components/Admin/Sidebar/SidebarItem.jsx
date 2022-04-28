import React from "react";
import { SidebarWrapper } from "./SidebarWrapper";
const SidebarItem = props => {
    return (
        <SidebarWrapper>
            <div className={`px-5 sidebar_item`}>
                <div
                    className={`py-3.5 px-6 flex items-center hover:bg-gradient-to-r from-third to-fourth hover:rounded-2xl ${
                        props.active ? "active" : ""
                    }`}
                >
                    <span className="font-semibold capitalize text-lg text-gray-500 ">
                        {props.title}
                    </span>
                </div>
            </div>
        </SidebarWrapper>
    );
};

export default SidebarItem;
