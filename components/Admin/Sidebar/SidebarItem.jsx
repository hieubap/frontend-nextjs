import React from "react";
import styles from "../../../styles/Sidebar.module.css";

const SidebarItem = props => {
    return (
        <div className={`px-5 ${styles.side_item_inner}`}>
            <div
                className={`py-3.5 px-6 flex items-center  ${
                    props.active ? styles.active : ""
                }`}
            >
                <span className="font-semibold capitalize text-lg text-gray-500">
                    {props.title}
                </span>
            </div>
        </div>
    );
};

export default SidebarItem;
