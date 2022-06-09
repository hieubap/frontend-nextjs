import React, { useState } from "react";
import { Button, Form, Input, Select, DatePicker, Upload, Image } from "antd";
import { useRouter } from "next/router";
import { GIOI_TINH } from "../../variables";
import { PlusOutlined } from "@ant-design/icons";
import CustomerModel from "../../models/Customer";

function FormManifest({
    errorValue = {},
    form,
    onFinish,
    onFinishFailed,
    loading,
    isCreate,
    apiUpdateAvatar,
    avatar,
}) {
    const [file, setFile] = useState();
    const router = useRouter();
    // function getBase64(file) {
    //     var reader = new FileReader();
    //     reader.readAsDataURL(file);
    //     reader.onload = function () {
    //         setFile({ ...file, base64: reader.result });
    //     };
    //     reader.onerror = function (error) {
    //         console.log("Error: ", error);
    //     };
    // }
    // const handleSubmit = (values) => {
    //     if (file.base64) {
    //         CustomerModel.apiPostWithoutPrefixDownload();
    //     }
    // };
    return (
        <Form
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout='vertical'
        >
            {apiUpdateAvatar && (
                <Upload
                    fileList={[]}
                    name='file'
                    className='avatar-upload-input'
                    listType={file?.base64 ? "text" : "picture-card"}
                    showUploadList={false}
                    customRequest={
                        apiUpdateAvatar
                        //     ({ onSuccess, onError, file }) => {
                        //     getBase64(file);
                        // }
                    }
                >
                    {avatar ? (
                        <img src={avatar} />
                    ) : (
                        <div>
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Tải lên</div>
                        </div>
                    )}
                </Upload>
            )}

            {isCreate && (
                <>
                    <Form.Item
                        name={"email"}
                        label={"Email"}
                        rules={[
                            {
                                required: true,
                                message: "Email không được bỏ trống",
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
                        <Input placeholder='nhập password' type={"password"} />
                    </Form.Item>
                    <Form.Item
                        name={"password2"}
                        label={"Nhập lại mật khẩu"}
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập lại password",
                            },
                            {
                                validator: (rule, value, callback) => {
                                    console.log(
                                        value,
                                        form.getFieldValue("password"),
                                        form.getFieldValue("password") !==
                                            value,
                                        'form.getFieldsValue("password")'
                                    );
                                    if (
                                        form.getFieldValue("password") !== value
                                    )
                                        callback(
                                            "Mật khẩu không đúng. Vui lòng kiểm tra lại"
                                        );
                                    else callback();
                                },
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
                        required: true,
                        message: "Họ không được bỏ trống",
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
                        required: true,
                        message: "Tên không được bỏ trống",
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
            <Form.Item>
                <div className='flex justify-center gap-4'>
                    <Button type='primary' htmlType='submit' loading={loading}>
                        Cập nhật
                    </Button>
                    <Button
                        onClick={() => router.push("/admin/customer")}
                        type='default'
                    >
                        Hủy
                    </Button>
                </div>
            </Form.Item>
        </Form>
    );
}

export default FormManifest;
