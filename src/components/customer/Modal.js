import { DatePicker, Form, Input, message, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import Customer from "../../models/Customer";
import { GIOI_TINH } from "../../variables";
import moment from "moment";
import User from "../../models/User";

const ModalCustomer = ({
    data = {},
    reload = () => {},
    afterSubmit = () => {},
    onCancel,
}) => {
    const [state, _setState] = useState({
        loading: false,
        validateFields: {},
        errorValue: {},
    });
    const setState = (data) => {
        _setState((pre) => ({ ...pre, ...data }));
    };
    const [form] = Form.useForm();
    useEffect(() => {
        form.setFieldsValue({
            ...data,
            date_of_birth: data.date_of_birth
                ? moment(data.date_of_birth)
                : null,
        });
    }, []);
    const apiUpdate = useMutation(
        "update",
        (param) => {
            setState({ loading: true });
            return Customer.update(param, data.id);
        },
        {
            onSuccess: (data) => {
                reload();
                afterSubmit(data);
                setState({ loading: false });
            },
            onError: (data) => {
                if (data.error) {
                    setState({
                        validateFields: data.error.reduce(
                            (a, b) => ({ ...a, ...b }),
                            {}
                        ),
                        errorValue: form.getFieldsValue(),
                    });
                    setTimeout(() => {
                        form.validateFields();
                    }, 200);
                }
                setState({ loading: false });
            },
        }
    );

    const apiCreate = useMutation(
        "create",
        (param) => {
            setState({ loading: true });
            return Customer.create(param);
        },
        {
            onSuccess: (data) => {
                reload();
                afterSubmit(data);
                setState({ loading: false });
            },
            onError: (data) => {
                if (data.error) {
                    setState({
                        validateFields: data.error.reduce(
                            (a, b) => ({ ...a, ...b }),
                            {}
                        ),
                        errorValue: form.getFieldsValue(),
                    });
                    setTimeout(() => {
                        form.validateFields();
                    }, 200);
                }
                setState({ loading: false });
            },
        }
    );

    const onFinish = ({
        password,
        password2,
        id,
        date_of_birth,
        ...values
    } = {}) => {
        if (data.id) {
            apiUpdate.mutate({
                ...values,
                user_name: data.user_name,
                id: data.id,
                date_of_birth: date_of_birth
                    ? date_of_birth.format("YYYY-MM-DD")
                    : undefined,
            });
        } else {
            if (password != password2) {
                message.error("Mật khẩu không đúng vui lòng kiểm tra lại!");
                return;
            }
            apiCreate.mutate({
                ...values,
                password,
                date_of_birth: date_of_birth
                    ? date_of_birth.format("YYYY-MM-DD")
                    : undefined,
                is_active: 1,
                manifests: [2, 3, 4],
            });
        }
    };
    return (
        <Modal
            visible={true}
            title='Thông tin'
            cancelText='Hủy'
            okText='Xong'
            onOk={form.submit}
            onCancel={onCancel}
            confirmLoading={state.loading}
        >
            <Form form={form} onFinish={onFinish} layout='vertical'>
                {!data.id && (
                    <>
                        <Form.Item
                            name={"email"}
                            label={"Email"}
                            rules={[
                                {
                                    validator: (rule, value, callback) => {
                                        if (state.errorValue?.email === value)
                                            callback(
                                                state.validateFields?.email
                                            );
                                        else callback();
                                    },
                                },
                            ]}
                        >
                            <Input placeholder='nhập email' />
                        </Form.Item>
                        <Form.Item
                            name={"password"}
                            label={"Mật khẩu"}
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập password",
                                },
                            ]}
                        >
                            <Input
                                placeholder='nhập password'
                                type={"password"}
                            />
                        </Form.Item>
                        <Form.Item
                            name={"password2"}
                            label={"Nhập lại mật khẩu"}
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập lại password",
                                },
                            ]}
                        >
                            <Input
                                placeholder='nhập lại password'
                                type={"password"}
                            />
                        </Form.Item>
                    </>
                )}
                <Form.Item
                    name={"first_name"}
                    label={"Họ"}
                    rules={[
                        {
                            validator: (rule, value, callback) => {
                                if (state.errorValue?.first_name === value)
                                    callback(state.validateFields?.first_name);
                                else callback();
                            },
                        },
                    ]}
                >
                    <Input placeholder='nhập tên' />
                </Form.Item>
                <Form.Item
                    name={"last_name"}
                    label={"Tên"}
                    rules={[
                        {
                            validator: (rule, value, callback) => {
                                if (state.errorValue?.last_name === value)
                                    callback(state.validateFields?.last_name);
                                else callback();
                            },
                        },
                    ]}
                >
                    <Input placeholder='nhập tên' />
                </Form.Item>
                <Form.Item name={"gender"} label={"Giới tính"}>
                    <Select options={GIOI_TINH} placeholder='Chọn giới tính' />
                </Form.Item>
                <Form.Item name={"date_of_birth"} label={"Ngày sinh"}>
                    <DatePicker
                        format={"DD/MM/YYYY"}
                        style={{ width: "100%" }}
                        placeholder='Nhập ngày sinh'
                    />
                </Form.Item>
                <Form.Item name={"phone_number"} label={"Số điện thoại"}>
                    <Input placeholder='nhập số điện thoại' />
                </Form.Item>
                <Form.Item name={"contact"} label={"Liên hệ"}>
                    <Input placeholder='nhập liên hệ' />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ModalCustomer;
