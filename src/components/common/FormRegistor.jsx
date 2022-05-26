import React from 'react'
import { Button, Form, Input, Tag } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import useUser from "../../hooks/useUser";
import { useMutation } from "react-query";
import user from "../../models/User";
import Password from 'antd/lib/input/Password';

const FormRegistor = ({ bgImage, routePass, ...props }) => {
    const styling = {
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
    };
    const router = useRouter();
    const { changeUser } = useUser();
    const registorMutation = useMutation(
        "registorMutation",
        (body) => user.register(body),
        {
            onSuccess: (data) => {
                console.log("success ", data);
                changeUser(data);
                router.push(routePass);
            },
        }
    );

    const onFinish = (values) => {
        registorMutation.mutate(values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };
    return (
        <div className='h-screen w-screen flex items-center' style={styling}>
            <div className='container mx-auto w-1/3 tablet:w-11/12 bg-white px-6 py-12 rounded-xl drop-shadow-xl'>
                <h1 className='text-3xl font-bold text-primary mb-8 text-center'>
                    Đăng ký
                </h1>
                {registorMutation.error?.msg && (
                    <div className='w-full text-center my-4'>
                        <Tag
                            color='error'
                            icon={<CloseCircleOutlined />}
                            onClick={() => registorMutation.reset()}
                        >
                            {registorMutation.error?.msg}
                        </Tag>
                    </div>
                )}
                <Form
                    name='registorForm'
                    onFinish={onFinish}
                    initialValues={{ password: "", confirmPw: "" }}
                    onFinishFailed={onFinishFailed}
                    layout='vertical'
                >
                    {(values, error) =>
                    (
                        <>
                            <Form.Item
                                label='Username'
                                name='name'
                                rules={[
                                    {
                                        required: true,
                                        message: "Tên đăng nhập không được bỏ trống",
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
                                <Input.Password className='rounded-xl' value={values.password} />
                            </Form.Item>
                            <Form.Item
                                label='Confirm password'
                                name='confirm-password'
                                rules={[
                                    {
                                        required: true,
                                        message: "Mật khẩu không được bỏ trống",
                                    },
                                ]}
                            >
                                <Input.Password className='rounded-xl' value={values.confirmPw} />
                            </Form.Item>
                            <Form.Item
                                label='Email'
                                name='email'
                                rules={[
                                    {
                                        required: true,
                                        message: "Username không được bỏ trống",
                                    },
                                ]}
                            >
                                <Input className='rounded-xl' />
                            </Form.Item>
                            <Form.Item
                                label='Full Name'
                                name='full_name'
                                rules={[
                                    {
                                        required: true,
                                        message: "Fullname không được bỏ trống",
                                    },
                                ]}
                            >
                                <Input className='rounded-xl' />
                            </Form.Item>
                            <Form.Item
                                label='Phone Number'
                                name='phone_number'
                                rules={[
                                    {
                                        required: true,
                                        message: "Phone Number không được bỏ trống",
                                    },
                                ]}
                            >
                                <Input className='rounded-xl' />
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    type='primary'
                                    htmlType='submit'
                                    className='rounded-md w-full mb-2'
                                >
                                    Đăng ký
                                </Button>
                            </Form.Item>
                        </>)}
                </Form>
            </div>
        </div>
    )
}

export default FormRegistor