import React from "react";
import UrlBreadcrumb from "../../../src/components/common/UrlBreadcrumb";
import PageAdminLayout from "../../../src/components/PageAdminLayout";
import { Spin } from "antd";
import FormManifest from "../../../src/components/forms/FormManifest";
import { useForm } from "antd/lib/form/Form";
import { useMutation } from "react-query";
import ManifestModel from "../../../src/models/Manifest";

function Create({ ...props }) {
    const [form] = useForm();

    const createManifestBread = [
        {
            name: "Phân quyền",
        },
        {
            name: "Danh sách phân quyền",
            url: "/admin/manifest",
        },
        {
            name: "Thêm mới quyền",
        },
    ];
    const createManifestMutation = useMutation(
        "createManifest",
        (body) => ManifestModel.update(body),
        {
            onSuccess: () => {},
            onError: (e) => {
                // set error base on server response
                if (e.errorCode === "role_name") {
                    form.setFields([
                        { ...form.getFieldsValue() },
                        {
                            name: "role_name",
                            errors: ["Tên quyền hạn đã tồn tại"],
                            value: form.getFieldValue("role_name"),
                        },
                    ]);
                }
            },
        }
    );

    const onFinish = (values) => {
        // loginMutation.mutate(values);
    };

    const onFinishFailed = (errorInfo) => {
        // console.log("Failed:", errorInfo);
    };

    return (
        <section>
            <UrlBreadcrumb breadcrumbs={createManifestBread} />
            <PageAdminLayout pageName='Thêm mới quyền hạn'>
                <Spin spinning={false}>
                    <FormManifest
                        form={form}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        loading={createManifestMutation.isLoading}
                    />
                </Spin>
            </PageAdminLayout>
        </section>
    );
}

export default Create;
