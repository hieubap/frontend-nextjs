import React from "react";
import { useRouter } from "next/router";
import useUser from "../../hooks/useUser";
import { useMutation } from "react-query";
import user from "../../models/User";
import { Button, Form, Input, Tag } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import Link from "next/link";

function FormLogin({ bgImage, routePass, ...props }) {
    const styling = {
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
    };
    const router = useRouter();
    const { changeUser } = useUser();
    const loginMutation = useMutation(
        "loginMutation",
        (body) => user.login(body),
        {
            onSuccess:  (data) => {
                changeUser(data);
                router.push(routePass);
            },
        }

    );

    const onFinish = (values) => {
        loginMutation.mutate(values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };
    return (
        <div className='h-screen w-screen flex items-center' style={styling}>
            <div className='container mx-auto w-1/3 tablet:w-11/12 bg-white px-6 py-12 rounded-xl drop-shadow-xl'>
                <h1 className='text-3xl font-bold text-primary mb-8 text-center'>
                    Đăng nhập
                </h1>
                {loginMutation.error?.msg && (
                    <div className='w-full text-center my-4'>
                        <Tag
                            color='error'
                            icon={<CloseCircleOutlined />}
                            onClick={() => loginMutation.reset()}
                        >
                            {loginMutation.error?.msg}
                        </Tag>
                    </div>
                )}
                <Form
                    name='loginForm'
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    layout='vertical'
                >
                    <Form.Item
                        label='Email'
                        name='email'
                        rules={[
                            {
                                required: true,
                                message: "Email không được bỏ trống",
                            },
                        ]}
                    >
                        <Input className='rounded-xl' />
                    </Form.Item>

                    <Form.Item
                        label='Password'
                        name='password'
                        rules={[
                            {
                                required: true,
                                message: "Mật khẩu không được bỏ trống",
                            },
                        ]}
                    >
                        <Input.Password className='rounded-xl' />
                    </Form.Item>
                    <div className='text-right cursor-pointer text-primary mb-8'>
                        Quên mật khẩu
                    </div>

                    <Form.Item>
                        <Button
                            type='primary'
                            htmlType='submit'
                            className='rounded-md w-full mb-2'
                            loading={loginMutation.isLoading}
                        >
                            Đăng nhập
                        </Button>
                        <Button
                            onClick={() => router.push("/registor")}
                            type='default'
                            className='rounded-md w-full'
                        >
                            Đăng ký
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}

export default FormLogin;
