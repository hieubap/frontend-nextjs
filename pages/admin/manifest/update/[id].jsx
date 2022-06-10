import React from "react";
import { useRouter } from "next/router";
import UrlBreadcrumb from "../../../../src/components/common/UrlBreadcrumb";
import PageAdminLayout from "../../../../src/components/PageAdminLayout";
import { useMutation, useQuery } from "react-query";
import ManifestModel from "../../../../src/models/Manifest";
import { Button, Form, Input, Spin } from "antd";
import { useForm } from "antd/lib/form/Form";
import FormManifest from "../../../../src/components/forms/FormManifest";

function ManifestDetail({ ...props }) {
    const router = useRouter();
    const { id } = router.query;
    const [form] = useForm();

    const { isLoading } = useQuery(
        "getDetailManifest",
        () => ManifestModel.detail(id),
        {
            enabled: !!id,
            onSuccess: (data) => {
                // trải phẳng data
                let temp = {role_name : data.role_name}
                form.setFieldsValue(temp)
            },
        }
    );
    const updateManifestMutation = useMutation('updateManifest' , (body)=>ManifestModel.update(id , body),{
        onSuccess : ()=>{

        },
        onError : (e)=>{
            // set error base on server response
            if(e.errorCode === 'role_name'){
                form.setFields([
                    { ...form.getFieldsValue() },
                    { name: 'role_name', errors: ['Tên quyền hạn đã tồn tại'], value: form.getFieldValue('role_name') },
                ]);
            }

        }
    })

    const updateManifestBread = [
        {
            name: "Phân quyền",
        },
        {
            name: "Danh sách phân quyền",
            url: "/admin/manifest",
        },
        {
            name: "Cập nhật quyền",
        },
    ];
    const onFinish = (values) => {
        // loginMutation.mutate(values);
    };

    const onFinishFailed = (errorInfo) => {
        // console.log("Failed:", errorInfo);
    };
    return (
        <section>
            <UrlBreadcrumb breadcrumbs={updateManifestBread} />
            <PageAdminLayout pageName='Cập nhật quyền hạn'>
                <Spin spinning={isLoading}>
                    <FormManifest form={form} onFinish={onFinish} onFinishFailed={onFinishFailed} loading = {updateManifestMutation.isLoading}/>
                </Spin>
            </PageAdminLayout>
        </section>
    );
}

export default ManifestDetail;