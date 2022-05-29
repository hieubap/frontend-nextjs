/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { Spin, Tabs } from "antd";
import styled from "styled-components";
import { Button, Form, Input, notification, message, Upload } from "antd";
import useUser from "../../../src/hooks/useUser";
import { useMutation, useQuery } from "react-query";
import getUserProfile from "../../../src/models/User";
import useForm from "antd/lib/form/hooks/useForm";
import { Avatar } from "antd";
import { UserOutlined, PlusOutlined } from "@ant-design/icons";
import {
    validateCompareOldPassword,
    validatePassword,
    validatePhoneNumber2,
    validateRequireInput,
} from "../../../src/utils/validator";

const { TabPane } = Tabs;
const ProfileWrapper = styled.div`
    .profile_left {
        .avatar {
            display: flex;
            align-items: center;
            justify-content: center;
            .anticon-user {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 50%;
                height: 50%;
                svg {
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
    .ant-tabs-content {
        justify-content: center;
    }

    .ant-form-item-control-input-content {
        display: flex;
        justify-content: center;
        .ant-btn-loading-icon {
            .anticon-loading {
                margin-top: 4px;
                display: flex;
                align-items: center;
            }
        }
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
    const { changeUser, user } = useUser();
    const [formProfile] = useForm();
    const [formChangePass] = useForm();
    const [loadingBt, setLoadingBt] = useState(false);
    // const [formChangePass] = useForm();
    const { data, isLoading, error, refetch } = useQuery(
        "userInfo",
        () => getUserProfile.getUser(user.id),
        {
            onSuccess: (res) => {
                formProfile.setFieldsValue(res);
            },
        }
    );
    const changeProfile = useMutation(
        "changeProfile",
        (body) => getUserProfile.changeProFile(body, user.id),
        {
            onSuccess: (data) => {
                notification.success({
                    message: "Cập nhật thông tin thành công!",
                });
                refetch(data);
            },
        }
    );
    const changePw = useMutation(
        "changePw",
        (body) => getUserProfile.changePassword(body),
        {
            onSuccess: (data) => {
                notification.success({
                    message: "Cập nhật mật khẩu thành công!",
                });
            },
        }
    );
    // console.log(isLoading);
    const onFinish = () => {
        setLoadingBt(true);
        formProfile.validateFields().then((values) => {
            changeProfile.mutate(values);
            setTimeout(() => {
                setLoadingBt(false);
            }, 2000);
        });
    };
    const onChangePw = () => {
        setLoadingBt(true);
        formChangePass.validateFields().then((values) => {
            let dataPw = {
                oldPassword: values.oldPassword,
                newPassword: values.newPassword,
            };
            console.log(dataPw);
            changePw.mutate(values);
            setTimeout(() => {
                setLoadingBt(false);
            }, 2000);
        });
    };

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
                                <div className='mt-20 flex tablet:block laptop2:gap-x-10 gap-x-20'>
                                    <div className='profile_left'>
                                        <Avatar
                                            className='avatar rounded-full w-64 mx-auto laptop2:w-52 h-64 laptop2:w-52'
                                            icon={<UserOutlined />}
                                        />
                                        <h3 className='text-center tablet:mb-10 mt-6 font-semibold text-xl'>
                                            {data?.user_name}
                                        </h3>
                                    </div>
                                    <div className='profile_right tablet:w-4/5 w-3/5 mobile:w-full'>
                                        <Form
                                            form={formProfile}
                                            name='profile'
                                            labelCol={{ span: 8 }}
                                            wrapperCol={{ span: 16 }}
                                            onFinish={onFinish}
                                            // onFinishFailed={onFinishFailed}
                                            autoComplete='off'
                                        >
                                            <Form.Item
                                                label='Username:'
                                                name='user_name'
                                                rules={[
                                                    validateRequireInput(
                                                        "Vui lòng không bỏ trống mục này"
                                                    ),
                                                ]}
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
                                                    className='rounded-lg'
                                                />
                                            </Form.Item>
                                            <Form.Item
                                                label='Địa chỉ liên hệ:'
                                                name='contact'
                                            >
                                                <Input
                                                    className='rounded-lg'
                                                    placeholder='Nhập thông tin liên hệ'
                                                />
                                            </Form.Item>
                                            <Form.Item
                                                label='Số điện thoại:'
                                                name='phone_number'
                                                rules={[
                                                    validatePhoneNumber2(
                                                        "Số điện thoại không đúng định dạng"
                                                    ),
                                                ]}
                                            >
                                                <Input
                                                    className='rounded-lgh'
                                                    placeholder='Nhập số điện thoại'
                                                />
                                            </Form.Item>
                                            <Form.Item className='justify-center'>
                                                <Button
                                                    type='primary'
                                                    htmlType='submit'
                                                    className='rounded-lg mt-10 w-30'
                                                    loading={loadingBt}
                                                >
                                                    {loadingBt ? "" : "Submit"}
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
                                form={formChangePass}
                                name='passwordChange'
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 16 }}
                                onFinish={onChangePw} // viet ham on finish khac
                                // onFinishFailed={onFinishFailed}
                                autoComplete='off'
                            >
                                <Form.Item
                                    label='Mật khẩu hiện tại'
                                    name='oldPassword'
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
                                    name='newPassword'
                                    dependencies={["oldPassword"]}
                                    rules={[
                                        validatePassword(
                                            "Mật khẩu không đúng định dạng"
                                        ),
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (
                                                    !value ||
                                                    getFieldValue(
                                                        "oldPassword"
                                                    ) !== value
                                                ) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(
                                                    new Error(
                                                        "Mật khẩu không được giống mật khẩu cũ"
                                                    )
                                                );
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password className='rounded-lg' />
                                </Form.Item>
                                <Form.Item
                                    label='Xác nhận Mật khẩu mới'
                                    name='cfNewPassword'
                                    dependencies={["newPassword"]}
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Hãy nhập lại mật khẩu mới!",
                                        },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (
                                                    !value ||
                                                    getFieldValue(
                                                        "newPassword"
                                                    ) === value
                                                ) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(
                                                    new Error(
                                                        "Mật khẩu mới không trùng khớp!"
                                                    )
                                                );
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password className='rounded-lg' />
                                </Form.Item>

                                <Form.Item className='justify-center'>
                                    <Button
                                        type='primary'
                                        htmlType='submit'
                                        className='rounded-lg mt-10 w-30'
                                        loading={loadingBt}
                                    >
                                        {loadingBt ? "" : "Submit"}
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
