import React from "react";
import UrlBreadcrumb from "../../../src/components/common/UrlBreadcrumb";
import PageAdminLayout from "../../../src/components/PageAdminLayout";
import { message, Spin } from "antd";
import FormCustomer from "../../../src/components/customer/FormCustomer";
import { useForm } from "antd/lib/form/Form";
import { useMutation } from "react-query";
import CustomerModel from "../../../src/models/Customer";
import { useRouter } from "next/router";

function Create({ ...props }) {
    const [form] = useForm();
    const router = useRouter();

    const createCustomerBread = [
        {
            name: "Quản lý tài khoản",
        },
        {
            name: "Danh sách khách hàng",
            url: "/admin/customer",
        },
        {
            name: "Thêm mới khách hàng",
        },
    ];
    const createCustomerMutation = useMutation(
        "createCustomer",
        (body) => CustomerModel.create(body),
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

    const onFinish = ({ password2, ...values }) => {
        createCustomerMutation.mutate(values);
    };

    const onFinishFailed = (errorInfo) => {
        // console.log("Failed:", errorInfo);
    };

    return (
        <section>
            <UrlBreadcrumb breadcrumbs={createCustomerBread} />
            <PageAdminLayout pageName='Thêm mới khách hàng'>
                <Spin spinning={false}>
                    <FormCustomer
                        form={form}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        loading={createCustomerMutation.isLoading}
                        isCreate={true}
                    />
                </Spin>
            </PageAdminLayout>
        </section>
    );
}

export default Create;
