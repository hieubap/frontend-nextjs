import React, { useState } from "react";
import { useRouter } from "next/router";
import UrlBreadcrumb from "../../../../../src/components/common/UrlBreadcrumb";
import PageAdminLayout from "../../../../../src/components/PageAdminLayout";
import { useMutation, useQuery } from "react-query";
import AdminModel from "../../../../../src/models/Admin";
import { Button, Form, Input, message, Spin } from "antd";
import { useForm } from "antd/lib/form/Form";
import FormAdmin from "../../../../../src/components/forms/FormAdmin";

function AdminDetail({ ...props }) {
    const router = useRouter();
    const { id } = router.query;
    const [form] = useForm();
    const [loading, setLoading] = useState(true);
    const [avatar, setAvatar] = useState();

    const { isLoading, refetch } = useQuery(
        "getDetailAdmin",
        () => AdminModel.detail(id),
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
    const updateAdminMutation = useMutation(
        "updateAdmin",
        (body) => AdminModel.apiPut(id, body),
        {
            onSuccess: (data) => {
                if (data.status === "ok") {
                    message.success(data.msg);
                    router.push("/admin/manage-account/type-admin");
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

    const updateAdminBread = [
        {
            name: "Quản lý tài khoản",
        },
        {
            name: "Danh sách quản trị viên",
            url: "/admin/manage-account/type-admin",
        },
        {
            name: "Cập nhật quản trị viên",
        },
    ];
    const onFinish = (values) => {
        updateAdminMutation.mutate(values);
    };

    const onFinishFailed = (errorInfo) => {
        // console.log("Failed:", errorInfo);
    };

    const UpdateAvatarMutation = useMutation(
        "updateAvatar",
        (body) => AdminModel.apiPut("/update-avatar/" + id, body),
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
            <UrlBreadcrumb breadcrumbs={updateAdminBread} />
            <PageAdminLayout pageName='Cập nhật quản trị viên'>
                <Spin spinning={isLoading || loading}>
                    <FormAdmin
                        form={form}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        loading={updateAdminMutation.isLoading}
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

export default AdminDetail;
