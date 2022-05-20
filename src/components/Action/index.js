import { EditOutlined, FileTextOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import React, { forwardRef } from "react";

const typeMap = {
    description: {
        component: FileTextOutlined,
        title: "Chi tiết",
    },
    edit: {
        component: EditOutlined,
        title: "Chỉnh sửa",
    },
};

const style = {
    fontSize: 24,
    marginRight: 0,
    cursor: "pointer",
    color: "#2C3D94",
};

const Action = ({ type = "description", onClick = () => {}, title }, ref) => {
    const Icon = typeMap[type];

    return (
        <Tooltip title={title || Icon.title}>
            <Icon.component style={style} onClick={onClick} />
        </Tooltip>
    );
};

export default forwardRef(Action);
