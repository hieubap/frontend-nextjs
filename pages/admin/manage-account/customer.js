import { Button, Switch, Table } from "antd";
import React, { useState, useEffect } from "react";
import Action from "../../../src/components/Action";
import Breadcrumb from "../../../src/components/Breadcrumb";
import { WrapperContainer } from "../../../src/layout/style/styled";
import User from "../../../src/models/User";
import { dataKhach } from "../../dataTest";
import { useMutation } from "react-query";
import ModalUser from "../../../src/components/modalUser";

const index = (props) => {
    const [state, _setState] = useState({ listData: [] });
    const setState = (data) => {
        _setState((pre) => ({ ...pre, ...data }));
    };
    const columns = [
        {
            title: "STT",
            render: (_, __, index) => index + 1,
        },
        {
            title: "Username",
            dataIndex: "user_name",
            key: "user_name",
        },
        {
            title: "Tên SME",
            dataIndex: "full_name",
            key: "full_name",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Số điện thoại",
            dataIndex: "phone_number",
            key: "phone_number",
        },
        {
            title: "Liên lạc",
            dataIndex: "contact",
            key: "contact",
        },
        {
            title: "Bật/tắt hoạt động",
            dataIndex: "is_active",
            key: "is_active",
            width: 170,
            render: (item) => <Switch defaultChecked={item}></Switch>,
        },
        {
            title: "",
            width: 80,
            render: (item, data) => (
                <div>
                    <Action />
                    <Action
                        type='edit'
                        onClick={() => {
                            setState({ showModal: true, data });
                        }}
                    />
                </div>
            ),
        },
    ];

    const breadcrumb = [
        { title: "Quản lý tài khoản" },
        { title: "Danh sách khách hàng" },
    ];

    const apiMutation = useMutation(
        "searchMutation",
        (param) => User.searchUser(param),
        {
            onSuccess: (data) => {
                console.log(data, "success search user");
                setState({ listData: data.rows });
            },
        }
    );
    useEffect(() => {
        apiMutation.mutate();
    }, []);
    return (
        <WrapperContainer>
            <div className='wrap-header'>
                <Breadcrumb data={breadcrumb} />
                <div>
                    <Button
                        type='primary'
                        onClick={() => {
                            setState({ showModal: true, data: {} });
                        }}
                    >
                        Thêm mới
                    </Button>
                </div>
            </div>
            <div className='wrap-table'>
                <Table columns={columns} dataSource={state.listData}></Table>
            </div>
            {state.showModal && (
                <ModalUser
                    reload={apiMutation.mutate}
                    data={state.data}
                    onCancel={() => {
                        setState({ showModal: false, data: null });
                    }}
                ></ModalUser>
            )}
        </WrapperContainer>
    );
};

export default index;
