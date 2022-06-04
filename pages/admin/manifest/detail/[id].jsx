import React from "react";
import { useRouter } from "next/router";
import UrlBreadcrumb from "../../../../src/components/common/UrlBreadcrumb";
import PageAdminLayout from "../../../../src/components/PageAdminLayout";
import { useQuery } from "react-query";
import ManifestModel from '../../../../src/models/Manifest'
import { Spin } from "antd";

function ManifestDetail({...props}) {
    const router = useRouter()
    const { id } = router.query

    const {data , isLoading } = useQuery('getDetailManifest' , ()=>ManifestModel.detail(id), {
        enabled : !!id
    })

    const detailManifestBread = [
        {
            name: "Phân quyền",
        },
        {
            name: "Danh sách phân quyền",
            url : '/admin/manifest'
        },
        {
            name: "Chi tiết quyền",
        },
    ];
    return(
    <section>
        <UrlBreadcrumb breadcrumbs={detailManifestBread} />
        <PageAdminLayout pageName='Chi tiết quyền hạn'>
            <Spin spinning={isLoading}>
                    <div>
                        {data?.role_name}
                    </div>

            </Spin>
        </PageAdminLayout>

    </section>
)
;
}

export default ManifestDetail;