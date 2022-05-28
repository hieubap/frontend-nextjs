/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { Spin, Tabs } from "antd";
import styled from "styled-components";
import { Button, Form, Input } from "antd";
import useUser from "../../../src/hooks/useUser";
import { useQuery } from "react-query";
import getUserProfile from "../../../src/models/User";
import useForm from "antd/lib/form/hooks/useForm";
import { validatePhoneNumber2 } from "../../../src/utils/validator";

const { TabPane } = Tabs;
const ProfileWrapper = styled.div`
    .ant-tabs-content {
        justify-content: center;
    }

    .ant-form-item-control-input-content {
        display: flex;
        justify-content: center;
    }

    .ant-tabs-tab {
        &.ant-tabs-tab-active {
            position: relative;

            &:after {
                content: "";
                width: 100%;
                height: 1px;
                background-color: #4976aa;
                position: absolute;
                bottom: 0;
                left: 0;
            }
        }
    }
`;

function Profile({ ...props }) {
    const { changerUser, user } = useUser();
    const [formProfile] = useForm();
    // const [formChangePass] = useForm();
    const { data, isLoading, error } = useQuery(
        "userInfo",
        () => getUserProfile.getUser(user.id),
        {
            onSuccess: (res) => {
                formProfile.setFieldsValue(res);
            },
        }
    );
    const onFinish = () => {
        // console.log("Success:", values);
        // if (
        //     !values.address &&
        //     !values.user_name &&
        //     !values.full_name &&
        //     !values.phone &&
        //     !values.contact
        // ) {
        // }
        formProfile.validateFields().then((values) => {
            // TODO : call update api here
        });
    };

    // const onFinishFailed = (errorInfo) => {
    //     console.log("Failed:", errorInfo);
    // };
    return (
        <ProfileWrapper>
            <div className='px-7 py-4'>
                <div className='profile_header'>
                    <div className='pb-5'>
                        <span>Quản lý tài khoản / </span>
                        <span className='text-blue-150'>
                            Thông tin tài khoản
                        </span>
                    </div>
                </div>
                <div className='profile_content'>
                    <Tabs defaultActiveKey='1'>
                        <TabPane tab='Chinh sửa thông tin tài khoản' key='1'>
                            <Spin spinning={isLoading}>
                                <div className='mt-20 flex mobile:block laptop2:gap-x-10 gap-x-20'>
                                    <div className='profile_left'>
                                        <img
                                            src='/user-icon.png'
                                            alt='avatar'
                                            className='rounded-full w-64 mx-auto laptop2:w-52'
                                        />
                                        <h3 className='text-center mobile:mb-10 mt-6 font-semibold text-xl'>
                                            {data?.user_name}
                                        </h3>
                                    </div>
                                    <div className='profile_right mobile:w-full w-3/5'>
                                        <Form
                                            form={formProfile}
                                            name='basic'
                                            labelCol={{ span: 8 }}
                                            wrapperCol={{ span: 16 }}
                                            onFinish={onFinish}
                                            // onFinishFailed={onFinishFailed}
                                            autoComplete='off'
                                        >
                                            <Form.Item
                                                label='Username:'
                                                name='user_name'
                                            >
                                                <Input
                                                    className='rounded-lg'
                                                    placeholder='Nhập tên hiển thị '
                                                />
                                            </Form.Item>
                                            <Form.Item
                                                label='Họ và tên:'
                                                name='full_name'
                                            >
                                                <Input
                                                    className='rounded-lg'
                                                    placeholder='Nhập tên đầy đủ'
                                                />
                                            </Form.Item>
                                            <Form.Item
                                                label='Email:'
                                                name='email'
                                            >
                                                <Input
                                                    disabled
                                                    placeholder='Nhập địa chỉ email'
                                                    className='rounded-lg'
                                                />
                                            </Form.Item>
                                            <Form.Item
                                                label='Địa chỉ liên hệ:'
                                                name='address'
                                            >
                                                <Input
                                                    className='rounded-lg'
                                                    placeholder='Nhập thông tin liên hệ'
                                                />
                                            </Form.Item>
                                            <Form.Item
                                                label='Số điện thoại:'
                                                name='phone'
                                                rules={[
                                                    validatePhoneNumber2(
                                                        "Số điện thoại không đúng định dạng"
                                                    ),
                                                ]}
                                            >
                                                <Input
                                                    className='rounded-lg'
                                                    placeholder='Nhập số điện thoại'
                                                />
                                            </Form.Item>
                                            <Form.Item className='justify-center'>
                                                <Button
                                                    type='primary'
                                                    htmlType='submit'
                                                    className='rounded-lg mt-10'
                                                    // loading={}
                                                >
                                                    Submit
                                                </Button>
                                            </Form.Item>
                                        </Form>
                                    </div>
                                </div>
                            </Spin>
                        </TabPane>
                        <TabPane
                            tab='Đổi mật khẩu'
                            key='2'
                            className='mobile:w-full w-3/5 mt-20'
                        >
                            <Form
                                // form={formChangePass}
                                name='basic'
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 16 }}
                                initialValues={{ remember: true }}
                                onFinish={onFinish}  // viet ham on finish khac
                                // onFinishFailed={onFinishFailed}
                                autoComplete='off'
                            >
                                <Form.Item
                                    label='Mật khẩu hiện tại'
                                    name='password'
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Mật khẩu không được bỏ trống!",
                                        },
                                    ]}
                                >
                                    <Input.Password className='rounded-lg' />
                                </Form.Item>

                                <Form.Item
                                    label='Mật khẩu mới'
                                    name='new-password'
                                    rules={[
                                        {
                                            required: true,
                                            message: "Nhập mật khẩu mới!",
                                        },
                                    ]}
                                >
                                    <Input.Password className='rounded-lg' />
                                </Form.Item>
                                <Form.Item
                                    label='Xác nhận Mật khẩu mới'
                                    name='cf-new-password'
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Hãy nhập lại mật khẩu mới!",
                                        },
                                    ]}
                                >
                                    <Input.Password className='rounded-lg' />
                                </Form.Item>

                                <Form.Item className='justify-center'>
                                    <Button
                                        type='primary'
                                        htmlType='submit'
                                        className='rounded-lg mt-10'
                                    >
                                        Submit
                                    </Button>
                                </Form.Item>
                            </Form>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        </ProfileWrapper>
    );
}

export default Profile;
