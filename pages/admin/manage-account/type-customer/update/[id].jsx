import React, { useState } from "react";
import { useRouter } from "next/router";
import UrlBreadcrumb from "../../../../../src/components/common/UrlBreadcrumb";
import PageAdminLayout from "../../../../../src/components/PageAdminLayout";
import { useMutation, useQuery } from "react-query";
import CustomerModel from "../../../../../src/models/Customer";
import { Button, Form, Input, message, Spin } from "antd";
import { useForm } from "antd/lib/form/Form";
import FormCustomer from "../../../../../src/components/forms/FormCustomer";

function CustomerDetail({ ...props }) {
    const router = useRouter();
    const { id } = router.query;
    const [form] = useForm();
    const [loading, setLoading] = useState(true);
    const [avatar, setAvatar] = useState();

    const { isLoading, refetch } = useQuery(
        "getDetailCustomer",
        () => CustomerModel.detail(id),
        {
            enabled: !!id,
            onSuccess: (data) => {
                // trải phẳng data
                let temp = { role_name: data.role_name };
                setAvatar(data.avatar);
                form.setFieldsValue(temp);
                setLoading(false);
            },
        }
    );
    const updateCustomerMutation = useMutation(
        "updateCustomer",
        (body) => CustomerModel.apiPut(id, body),
        {
            onSuccess: (data) => {
                if (data.status === "ok") {
                    message.success(data.msg);
                    router.push("/admin/customer");
                }
            },
            onError: (e) => {
                // set error base on server response
                if (e.error) {
                    form.setFields([
                        { ...form.getFieldsValue() },
                        ...e.error.reduce(
                            (a, b) => [
                                ...a,
                                {
                                    name: Object.keys(b)[0],
                                    errors: [b[Object.keys(b)[0]]],
                                    value: form.getFieldValue(
                                        Object.keys(b)[0]
                                    ),
                                },
                            ],
                            []
                        ),
                    ]);
                }
            },
        }
    );

    const updateCustomerBread = [
        {
            name: "Quản lý tài khoản",
        },
        {
            name: "Danh sách khách hàng",
            url: "/admin/customer",
        },
        {
            name: "Cập nhật khách hàng",
        },
    ];
    const onFinish = (values) => {
        updateCustomerMutation.mutate(values);
    };

    const onFinishFailed = (errorInfo) => {
        // console.log("Failed:", errorInfo);
    };

    const UpdateAvatarMutation = useMutation(
        "updateAvatar",
        (body) => CustomerModel.apiPut("/update-avatar/" + id, body),
        {
            onSuccess: async (data) => {
                refetch();
                setLoading(false);
                message.success(data.message || "Cập nhật thành công");
            },
            onError: (e) => {
                console.log(e);
            },
        }
    );
    return (
        <section>
            <UrlBreadcrumb breadcrumbs={updateCustomerBread} />
            <PageAdminLayout pageName='Cập nhật khách hàng'>
                <Spin spinning={isLoading || loading}>
                    <FormCustomer
                        form={form}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        loading={updateCustomerMutation.isLoading}
                        apiUpdateAvatar={({ file }) => {
                            const formData = new FormData();
                            formData.append("file", file);

                            setLoading(true);
                            UpdateAvatarMutation.mutate(formData);
                        }}
                        avatar={avatar}
                    />
                </Spin>
            </PageAdminLayout>
        </section>
    );
}

export default CustomerDetail;
