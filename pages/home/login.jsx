import React, { useState } from "react";
import { Button, Form, Input, Tag } from "antd";
import user from "../../models/User";
import { useMutation } from "react-query";
import { CloseCircleOutlined } from "@ant-design/icons";
import {useRouter} from "next/router";
import useUser from "../../hooks/useUser";


const styling = {
    backgroundImage:
        "url(https://dongten.net/wp-content/uploads/2021/09/hinh-anh-bao-ve-moi-truong-dep-nhat.jpg)",
    backgroundSize: "cover",
    backgroundPosition: "center",
};

function Login() {
    const router = useRouter()
    const {changeUser} = useUser()
    const loginMutation = useMutation("loginMutation", (body) => user.login(body), {
        onSuccess: (data) => {
            console.log("success ", data);
            changeUser(data)
            router.push('/')
        },
    });

    const onFinish = (values) => {
        loginMutation.mutate(values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <div
            className="h-screen w-screen flex items-center"
            style={styling}
        >
            <div className="container mx-auto w-1/3 tablet:w-11/12 bg-white px-6 py-12 rounded-xl drop-shadow-xl">
                <h1 className="text-3xl font-bold text-primary mb-8 text-center">Đăng nhập</h1>
                {loginMutation.error?.msg && <div className="w-full text-center my-4">
                    <Tag color="error" icon={<CloseCircleOutlined />} onClick={()=>loginMutation.reset()}>
                        {loginMutation.error?.msg}
                    </Tag></div>}
                <Form
                    name="loginForm"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    layout="vertical"
                >
                    <Form.Item
                        label="Username"
                        name="name"
                        rules={[{ required: true, message: "Tên đăng nhập không được bỏ trống" }]}
                    >
                        <Input className="rounded-xl" />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: "Mật khẩu không được bỏ trống" }]}
                    >
                        <Input.Password className="rounded-xl" />
                    </Form.Item>
                    <div className="text-right cursor-pointer text-primary mb-8">Quên mật khẩu</div>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="rounded-md w-full mb-2">
                            Đăng nhập
                        </Button>
                        <Button type="default" className="rounded-md w-full">
                            Đăng ký
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>);
};

export default Login;
