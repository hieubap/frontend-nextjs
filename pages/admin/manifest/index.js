import React from "react";
import UrlBreadcrumb from "../../../src/components/common/UrlBreadcrumb";
import AIRSENSE from "../../../src/models/AIRSENSE";
import useUser from "../../../src/hooks/useUser";
import PageAdminLayout from "../../../src/components/PageAdminLayout";
import {Button, Input, Select, Switch} from "antd";
import usePagination from "../../../src/hooks/usePagination";
import { Table } from "antd";
import ManifestModel from "../../../src/models/Manifest";
import {useRouter} from "next/router";

function Manifest({ ...props }) {
    const router = useRouter()
    const manifestBread = [
        {
            name: "Phân quyền",
        },
        {
            name: "Danh sách phần quyền",
        },
    ];
    const { permissions } = useUser();
    const CAN_SEARCH_MANIFEST = AIRSENSE.canAccessFuture(
        "SEARCH_MANIFEST",
        permissions
    );
    const CAN_CREATE_MANIFEST = AIRSENSE.canAccessFuture(
        "CREATE_MANIFEST",
        permissions
    );
    const CAN_UPDATE_MANIFEST = AIRSENSE.canAccessFuture(
        "UPDATE_MANIFEST",
        permissions
    );
    const CAN_DELETE_MANIFEST = AIRSENSE.canAccessFuture(
        "DELETE_MANIFEST",
        permissions
    );
    const CAN_DETAIL_MANIFEST = AIRSENSE.canAccessFuture(
        "DETAIL_MANIFEST",
        permissions
    );
    const {
        configTable,
        page,
        pageSize,
        refetch,
        query,
        onChangeOneParam,
        getColumnSortDefault,
    } = usePagination((params) => {
        return ManifestModel.search(params);
    });
    const column = [
        {
            title: "STT",
            dataIndex: "id",
            key: "id",
            render: (value, item, index) => (page - 1) * pageSize + index + 1,
        },
        {
            title: "Tên quyền hạn",
            dataIndex: "role_name",
            key: "role_name",
            render : (value , record )=><span onClick={()=>CAN_DETAIL_MANIFEST && router.push()}>{value}</span>
        },
        {
            title: "Nội dung",
            dataIndex: "content",
            key: "content",
        },
        {
            title: "Trạng thái",
            dataIndex: "is_active",
            key: "is_active",
            render: (value, record) => (
                <Switch disabled={!CAN_DELETE_MANIFEST} checked={value === 1} />
            ),
        },
    ];

    return (
        <section>
            <UrlBreadcrumb breadcrumbs={manifestBread} />
            <PageAdminLayout pageName='Danh sách quyền hạn'>
                <div className='flex justify-between gap-8'>
                    <div className='flex gap-4 flex-grow'>
                        <Input size='middle' placeHolder='Nhập tên' className='flex-1'/>
                        <Select placeholder='Trạng thái hoạt động'  className='flex-1'>
                            <Select.Option value={-1}>Tất cả</Select.Option>
                            <Select.Option value={1}>Bật</Select.Option>
                            <Select.Option value={0}>Tắt</Select.Option>
                        </Select>
                    </div>
                    {CAN_CREATE_MANIFEST && <Button type='primary'>Thêm mới</Button>}

                </div>
                <Table
                    className='mt-8'
                    columns={getColumnSortDefault(column)}
                    {...configTable}
                    scroll={{
                        x: 1050,
                    }}
                />
            </PageAdminLayout>
        </section>
    );
}

export default Manifest;
