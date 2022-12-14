/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { Spin, Tabs } from "antd";
import styled from "styled-components";
import {
    Button,
    Form,
    Input,
    notification,
    message,
    Upload,
    DatePicker,
    Select,
} from "antd";
import useUser from "../../../src/hooks/useUser";
import moment from "moment";
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
const { Option } = Select;
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
    .date {
        .ant-form-item-control-input-content {
            justify-content: start;
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
    const { data, isLoading, error, refetch } = useQuery(
        "userInfo",
        () => getUserProfile.getUser(),
        {
            onSuccess: (res) => {
                formProfile.setFieldsValue({
                    firstName: res.first_name,
                    lastName: res.last_name,
                    email: res.email,
                    dob: moment(res.date_of_birth),
                    gender: res.gender,
                    contact: res.contact,
                    phone: res.phone_number,
                });
            },
        }
    );
    console.log(data);
    const changeProfile = useMutation(
        "changeProfile",
        (body) => getUserProfile.changeProFile(body, user.id),
        {
            onSuccess: (data) => {
                console.log(data);
                notification.success({
                    message: "C???p nh???t th??ng tin th??nh c??ng!",
                });
                refetch(data);
            },
            onError: (err) => {
                notification.error(err);
            },
        }
    );
    const changePw = useMutation(
        "changePw",
        (body) => getUserProfile.changePassword(body),
        {
            onSuccess: (data) => {
                notification.success({
                    message: "C???p nh???t m???t kh???u th??nh c??ng!",
                });
            },
        }
    );
    // console.log(isLoading);
    const onFinish = (values) => {
        // setLoadingBt(true);
        let data = {
            first_name: values.firstName,
            last_name: values.lastName,
            email: values.email,
            date_of_birth: moment(values.dob).format("YYYY/MM/DD"),
            gender: values.gender,
            contact: values.contact,
            phone_number: values.phone,
        };
        console.log(data);
        // formProfile
        //     .validateFields()
        //     .then((values) => {
        //         changeProfile.mutate(values);
        //         setTimeout(() => {
        //             setLoadingBt(false);
        //         }, 2000);
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });
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
                        <span>Qu???n l?? t??i kho???n / </span>
                        <span className='text-blue-150'>
                            Th??ng tin t??i kho???n
                        </span>
                    </div>
                </div>
                <div className='profile_content'>
                    <Tabs defaultActiveKey='1'>
                        <TabPane tab='Chinh s???a th??ng tin t??i kho???n' key='1'>
                            <Spin spinning={isLoading}>
                                <div className='mt-20 flex tablet:block laptop2:gap-x-10 gap-x-20'>
                                    <div className='profile_left'>
                                        <Avatar
                                            className='avatar rounded-full w-64 mx-auto laptop2:w-52 h-64 laptop2:w-52'
                                            icon={<UserOutlined />}
                                        />
                                        <h3 className='text-center tablet:mb-10 mt-6 font-semibold text-xl'>
                                            {data?.last_name}
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
                                                label='First Name:'
                                                name='firstName'
                                            >
                                                <Input
                                                    className='rounded-lg'
                                                    placeholder='Nh???p t??n hi???n th??? '
                                                />
                                            </Form.Item>
                                            <Form.Item
                                                label='Last Name:'
                                                name='lastName'
                                            >
                                                <Input
                                                    className='rounded-lg'
                                                    placeholder='Nh???p t??n ?????y ?????'
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
                                                label='Ng??y sinh'
                                                name='dob'
                                                className='date'
                                            >
                                                <DatePicker />
                                            </Form.Item>
                                            <Form.Item
                                                label='Gi???i t??nh'
                                                name='gender'
                                            >
                                                <Select placeholder='Ch???n m???t trong s??? c??c l???a ch???n'>
                                                    <Option value='1'>
                                                        Nam
                                                    </Option>
                                                    <Option value='2'>
                                                        N???
                                                    </Option>
                                                </Select>
                                            </Form.Item>

                                            <Form.Item
                                                label='?????a ch??? li??n h???:'
                                                name='contact'
                                            >
                                                <Input
                                                    className='rounded-lg'
                                                    placeholder='Nh???p th??ng tin li??n h???'
                                                />
                                            </Form.Item>
                                            <Form.Item
                                                label='S??? ??i???n tho???i:'
                                                name='phone'
                                                rules={[
                                                    validatePhoneNumber2(
                                                        "S??? ??i???n tho???i kh??ng ????ng ?????nh d???ng"
                                                    ),
                                                ]}
                                            >
                                                <Input
                                                    className='rounded-lgh'
                                                    placeholder='Nh???p s??? ??i???n tho???i'
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
                            tab='?????i m???t kh???u'
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
                                    label='M???t kh???u hi???n t???i'
                                    name='oldPassword'
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "M???t kh???u kh??ng ???????c b??? tr???ng!",
                                        },
                                    ]}
                                >
                                    <Input.Password className='rounded-lg' />
                                </Form.Item>

                                <Form.Item
                                    label='M???t kh???u m???i'
                                    name='newPassword'
                                    dependencies={["oldPassword"]}
                                    rules={[
                                        validatePassword(
                                            "M???t kh???u kh??ng ????ng ?????nh d???ng"
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
                                                        "M???t kh???u kh??ng ???????c gi???ng m???t kh???u c??"
                                                    )
                                                );
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password className='rounded-lg' />
                                </Form.Item>
                                <Form.Item
                                    label='X??c nh???n M???t kh???u m???i'
                                    name='cfNewPassword'
                                    dependencies={["newPassword"]}
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "H??y nh???p l???i m???t kh???u m???i!",
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
                                                        "M???t kh???u m???i kh??ng tr??ng kh???p!"
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
