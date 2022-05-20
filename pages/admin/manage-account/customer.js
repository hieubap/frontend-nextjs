import { Switch, Table } from "antd";
import React from "react";
import Action from "../../../src/components/Action";
import Breadcrumb from "../../../src/components/Breadcrumb";
import { WrapperContainer } from "../../../src/layout/style/styled";
import { dataKhach } from "../../dataTest";

const index = (props) => {
    const columns = [
        {
            title: "STT",
            render: (_, __, index) => index + 1,
        },
        {
            title: "Tên SME",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Số điện thoại",
            dataIndex: "sdt",
            key: "sdt",
        },
        {
            title: "Bật/tắt hoạt động",
            dataIndex: "active",
            key: "active",
            width: 200,
            render: (item) => <Switch defaultChecked={item}></Switch>,
        },
        {
            title: "",
            width: 80,
            render: (item) => (
                <div>
                    <Action />
                    <Action type='edit' />
                </div>
            ),
        },
    ];

    const breadcrumb = [
        { title: "Quản lý tài khoản" },
        { title: "Danh sách khách hàng" },
    ];
    return (
        <WrapperContainer>
            <Breadcrumb data={breadcrumb} />
            <div className='wrap-table'>
                <Table columns={columns} dataSource={dataKhach}></Table>
            </div>
        </WrapperContainer>
    );
};

export default index;
