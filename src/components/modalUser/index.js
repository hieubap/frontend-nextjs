import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Form, Input, message, Modal } from "antd";
import User from "../../models/User";
import { useMutation } from "react-query";

const ModalUser = ({ data = {}, reload = () => {}, onCancel }) => {
    const [form] = Form.useForm();
    useEffect(() => {
        form.setFieldsValue(data);
    }, []);
    const apiUpdate = useMutation("update", (param) => User.update(param), {
        onSuccess: (data) => {
            reload();
            console.log(data, "success search user");
            // setState({});
        },
    });

    const apiCreate = useMutation("create", (param) => User.createUser(param), {
        onSuccess: (data) => {
            reload();
            console.log(data, "success search user");
            // setState({});
        },
    });

    const onFinish = ({ password, password2, id, ...values } = {}) => {
        if (data.id) {
            apiUpdate.mutate({
                ...values,
                user_name: data.user_name,
                id: data.id,
            });
        } else {
            if (password != password2) {
                message.error("Mật khẩu không đúng vui lòng kiểm tra lại!");
                return;
            }
            apiCreate.mutate({
                ...values,
                password,
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
        >
            <Form form={form} onFinish={onFinish} layout='vertical'>
                {!data.id && (
                    <>
                        <Form.Item
                            name={"user_name"}
                            label={"Username"}
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập username",
                                },
                            ]}
                        >
                            <Input placeholder='nhập username' />
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
                    name={"full_name"}
                    label={"Tên SME"}
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập tên tài khoản",
                        },
                    ]}
                >
                    <Input placeholder='nhập tên' />
                </Form.Item>
                <Form.Item
                    name={"email"}
                    label={"Email"}
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập email",
                        },
                    ]}
                >
                    <Input placeholder='nhập email' />
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

export default ModalUser;
