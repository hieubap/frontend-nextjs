import React from "react";
import { Button, Form, Input } from "antd";
import { useRouter } from "next/router";

function FormManifest({form , onFinish , onFinishFailed ,loading, ...props}) {
    const router = useRouter()
    return (
        <Form
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout='vertical'
        >
            <Form.Item
                label='Tên quyền hạn'
                name='role_name'
                rules={[
                    {
                        required: true,
                        message: "Tên quyền không được bỏ trống",
                    },
                ]}
            >
                <Input className='rounded-xl' />
            </Form.Item>
            <Form.Item>
                <div className='flex justify-center gap-4'>
                    <Button
                        type='primary'
                        htmlType='submit'
                        loading={loading}
                    >
                        Cập nhật
                    </Button>
                    <Button onClick={() => router.push("/admin/manifest")} type='default' >
                        Hủy
                    </Button>
                </div>

            </Form.Item>
        </Form>
    );
}

export default FormManifest;