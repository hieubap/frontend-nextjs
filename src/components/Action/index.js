import {
    DeleteOutlined,
    EditOutlined,
    FileTextOutlined,
} from "@ant-design/icons";
import { Popconfirm, Tooltip } from "antd";
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
    delete: {
        component: DeleteOutlined,
        title: "Xóa",
        color: "red",
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
            {type === "delete" ? (
                <Popconfirm
                    title='Bạn có chắc muốn xóa bản ghi này không ?'
                    onConfirm={onClick}
                    okText='Xóa'
                    cancelText='Hủy'
                >
                    <Icon.component style={{ ...style, color: "red" }} />
                </Popconfirm>
            ) : (
                <Icon.component style={style} onClick={onClick} />
            )}
        </Tooltip>
    );
};

export default forwardRef(Action);
