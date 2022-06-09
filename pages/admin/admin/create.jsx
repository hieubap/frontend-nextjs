import React from "react";
import UrlBreadcrumb from "../../../src/components/common/UrlBreadcrumb";
import PageAdminLayout from "../../../src/components/PageAdminLayout";
import { message, Spin } from "antd";
import FormAdmin from "../../../src/components/admin/FormAdmin";
import { useForm } from "antd/lib/form/Form";
import { useMutation } from "react-query";
import AdminModel from "../../../src/models/Admin";
import { useRouter } from "next/router";

function Create({ ...props }) {
    const [form] = useForm();
    const router = useRouter();

    const createAdminBread = [
        {
            name: "Quản lý tài khoản",
        },
        {
            name: "Danh sách quản trị viên",
            url: "/admin/admin",
        },
        {
            name: "Thêm mới quản trị viên",
        },
    ];
    const createAdminMutation = useMutation(
        "createAdmin",
        (body) => AdminModel.create(body),
        {
            onSuccess: (data) => {
                if (data.status === "ok") {
                    message.success(data.msg);
                    router.push("/admin/admin");
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

    const onFinish = ({ password2, ...values }) => {
        createAdminMutation.mutate(values);
    };

    const onFinishFailed = (errorInfo) => {
        // console.log("Failed:", errorInfo);
    };

    return (
        <section>
            <UrlBreadcrumb breadcrumbs={createAdminBread} />
            <PageAdminLayout pageName='Thêm mới quản trị viên'>
                <Spin spinning={false}>
                    <FormAdmin
                        form={form}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        loading={createAdminMutation.isLoading}
                        isCreate={true}
                    />
                </Spin>
            </PageAdminLayout>
        </section>
    );
}

export default Create;
