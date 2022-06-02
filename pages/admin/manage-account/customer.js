import {
    Button,
    Input,
    message,
    Pagination,
    Popconfirm,
    Spin,
    Switch,
    Table,
} from "antd";
import React, { useState, useEffect, useRef } from "react";
import Action from "../../../src/components/Action";
import Breadcrumb from "../../../src/components/Breadcrumb";
import { WrapperContainer } from "../../../src/layout/style/styled";
import Customer from "../../../src/models/Customer";
import { dataKhach } from "../../dataTest";
import { useMutation } from "react-query";
import ModalCustomer from "../../../src/components/customer/Modal";
import { GIOI_TINH } from "../../../src/variables";
import moment from "moment";

const index = (props) => {
    const refSearch = useRef();
    const [state, _setState] = useState({
        listData: [],
        loading: false,
        param: { page: 1, size: 10 },
    });
    const setState = (data) => {
        _setState((pre) => ({ ...pre, ...data }));
    };

    const onSearch = (key) => (e) => {
        if (refSearch.current) {
            clearTimeout(refSearch.current);
        }
        refSearch.current = setTimeout(() => {
            apiSearch.mutate({ [key]: e.target.value, page: 0 });
        }, 500);
    };
    const apiDelete = useMutation(
        "delete",
        (id) => {
            return Customer.delete(id);
        },
        {
            onSuccess: (data) => {
                message.success("Xóa thành công");
                apiSearch.mutate();
            },
        }
    );

    const columns = [
        {
            title: "STT",
            width: 80,
            fixed: "left",
            render: (_, __, index) => index + 1,
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            width: 240,
            fixed: "left",
        },
        {
            title: "Họ",
            dataIndex: "first_name",
            key: "first_name",
            width: 100,
        },
        {
            title: "Tên",
            dataIndex: "last_name",
            key: "last_name",
            width: 100,
        },
        {
            title: "Giới tính",
            dataIndex: "gender",
            key: "gender",
            width: 200,
            render: (item) => GIOI_TINH.find((i) => i.value === item)?.label,
        },
        {
            title: "Ngày sinh",
            dataIndex: "date_of_birth",
            key: "date_of_birth",
            width: 150,
            render: (item) =>
                item ? moment(item).format("DD/MM/YYYY") : "Không có",
        },
        {
            title: "Số điện thoại",
            dataIndex: "phone_number",
            key: "phone_number",
            width: 180,
        },
        {
            title: "Liên lạc",
            dataIndex: "contact",
            key: "contact",
            width: 200,
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
            width: 100,
            fixed: "right",
            render: (item, data) => (
                <div>
                    <Action
                        type='edit'
                        onClick={() => {
                            setState({ showModal: true, data });
                        }}
                    />
                    <Action
                        type='delete'
                        onClick={() => {
                            apiDelete.mutate(data.id);
                            // setState({ showModal: true, data });
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

    const apiSearch = useMutation(
        "search",
        (param) => {
            const newParam = { ...state.param, ...param };
            setState({ param: newParam, loading: true });
            return Customer.search(newParam);
        },
        {
            onSuccess: (data) => {
                setState({
                    listData: data.rows,
                    count: data.count,
                    loading: false,
                });
            },
            onError: () => {
                setState({ loading: false });
            },
        }
    );
    useEffect(() => {
        apiSearch.mutate();
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
            <div className='wrap-search'>
                <Input placeholder='Email' onChange={onSearch("email")} />
                <Input placeholder='Họ' onChange={onSearch("first_name")} />
                <Input placeholder='Tên' onChange={onSearch("last_name")} />
                <Input
                    placeholder='Số điện thoại'
                    onChange={onSearch("phone_number")}
                />
            </div>
            <div className='wrap-table'>
                <Spin
                    spinning={state.loading}
                    size='large'
                    tip='Đang tải dữ liệu'
                >
                    <Table
                        columns={columns}
                        dataSource={state.listData}
                        scroll={{ x: 400, y: "auto" }}
                        pagination={{
                            current: state.param.page,
                            onChange: (page, size) => {
                                apiSearch.mutate({
                                    page: size !== state.param?.size ? 0 : page,
                                    size,
                                });
                            },
                            // pageSize:
                            //     state.count < state.param?.limit
                            //         ? state.count
                            //         : state.param?.limit,
                            total: state.count,
                            pageSizeOptions: [10, 20, 50, 100],
                            showSizeChanger: true,
                            // totalBoundaryShowSizeChanger: 10,
                        }}
                    ></Table>
                </Spin>
            </div>
            {state.showModal && (
                <ModalCustomer
                    reload={apiSearch.mutate}
                    data={state.data}
                    onCancel={() => {
                        setState({ showModal: false, data: null });
                    }}
                    afterSubmit={(data) => {
                        if (data.status === "ok") {
                            message.success(data.msg);
                        }
                        setState({ showModal: false, data: null });
                    }}
                ></ModalCustomer>
            )}
        </WrapperContainer>
    );
};

export default index;
