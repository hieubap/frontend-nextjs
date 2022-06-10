import {
    DeleteOutlined,
    EditOutlined,
    FileSearchOutlined,
} from "@ant-design/icons";
import { Button, message, Modal, Select, Switch, Table, Tooltip } from "antd";
import moment from "moment";
import Link from "next/Link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useMutation } from "react-query";
import SearchCommon from "../../../../src/components/common/SearchCommon";
import UrlBreadcrumb from "../../../../src/components/common/UrlBreadcrumb";
import PageAdminLayout from "../../../../src/components/PageAdminLayout";
import usePagination from "../../../../src/hooks/usePagination";
import useQueryUrl from "../../../../src/hooks/useQueryUrl";
import useUser from "../../../../src/hooks/useUser";
import AIRSENSE from "../../../../src/models/AIRSENSE";
import AdminModel from "../../../../src/models/Admin";
import { GIOI_TINH } from "../../../../src/utils/constant";

function Admin({ ...props }) {
    const router = useRouter();
    const adminBread = [
        {
            name: "Quản lý tài khoản",
        },
        {
            name: "Danh sách quản trị viên",
        },
    ];
    const { permissions } = useUser();

    const CAN_CREATE_ADMIN = AIRSENSE.canAccessFuture(
        "CREATE_ADMIN",
        permissions
    );
    const CAN_UPDATE_ADMIN = AIRSENSE.canAccessFuture(
        "UPDATE_ADMIN",
        permissions
    );

    const CAN_ACTIVE_ADMIN = AIRSENSE.canAccessFuture(
        "ACTIVE_ADMIN",
        permissions
    );
    const CAN_DETAIL_ADMIN = AIRSENSE.canAccessFuture(
        "DETAIL_ADMIN",
        permissions
    );
    const CAN_DELETE_ADMIN = AIRSENSE.canAccessFuture(
        "DELETE_ADMIN",
        permissions
    );

    const query = useQueryUrl();
    const [searchEmail, setSearchEmail] = useState(query.get("email"));
    const [searchFirstname, setSearchFirstname] = useState(
        query.get("first_name")
    );
    const [searchLastName, setSearchLastName] = useState(
        query.get("last_name")
    );
    const [searchPhoneNumber, setSearchPhoneNumber] = useState(
        query.get("phone_number")
    );
    const [activeStatus, setActiveStatus] = useState(query.get("is_active"));
    const { configTable, page, pageSize, refetch, onChangeOneParam } =
        usePagination(
            (params) => AdminModel.search(params),
            ["role_name", "is_active"],
            {
                email: searchEmail,
                first_name: searchFirstname,
                last_name: searchLastName,
                phone_number: searchPhoneNumber,
                is_active: activeStatus,
            }
        );
    const ToggleActiveMutation = useMutation(
        "toggleActive",
        (id) => AdminModel.toggleActive(id),
        {
            onSuccess: async () => {
                refetch();
            },
            onError: (e) => {
                console.log(e);
                // Modal.error({ title: "Thay đổi trạng thái thất bại" });
            },
        }
    );
    const DeleteMutation = useMutation(
        "deleteAdmin",
        (id) => AdminModel.delete(id),
        {
            onSuccess: async (data) => {
                message.success(data.message || "Xóa thành công");
                refetch();
            },
            onError: (e) => {
                console.log(e);
                // Modal.error({ title: "Thay đổi trạng thái thất bại" });
            },
        }
    );

    const column = [
        {
            title: "STT",
            width: 80,
            fixed: "left",
            render: (_, __, index) => index + 1,
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            width: 240,
            fixed: "left",
        },
        {
            title: "Họ",
            dataIndex: "first_name",
            key: "first_name",
            width: 100,
        },
        {
            title: "Tên",
            dataIndex: "last_name",
            key: "last_name",
            width: 100,
        },
        {
            title: "Giới tính",
            dataIndex: "gender",
            key: "gender",
            width: 200,
            render: (item) => GIOI_TINH.find((i) => i.value === item)?.label,
        },
        {
            title: "Ngày sinh",
            dataIndex: "date_of_birth",
            key: "date_of_birth",
            width: 150,
            render: (item) =>
                item ? moment(item).format("DD/MM/YYYY") : "Không có",
        },
        {
            title: "Số điện thoại",
            dataIndex: "phone_number",
            key: "phone_number",
            width: 180,
        },
        {
            title: "Liên lạc",
            dataIndex: "contact",
            key: "contact",
            width: 200,
        },
        {
            title: "Trạng thái",
            dataIndex: "is_active",
            key: "is_active",
            width: 200,
            render: (value, record) => (
                <Switch
                    disabled={!CAN_ACTIVE_ADMIN}
                    checked={value === 1}
                    onChange={() =>
                        Modal.confirm({
                            title: "Bạn chắc chắn muốn thay đổi trạng thái hoạt động ?",
                            onOk: () => {
                                ToggleActiveMutation.mutate(record.id);
                            },
                        })
                    }
                />
            ),
        },
        {
            title: "Thao tác",
            key: "action",
            width: 120,
            fixed: "right",
            render: (value, record) => (
                <div className='flex gap-4'>
                    {CAN_DETAIL_ADMIN && (
                        <Link href={`/admin/manage-account/type-admin/detail/${record.id}`}>
                            <Tooltip title='chi tiết'>
                                <FileSearchOutlined
                                    style={{ fontSize: 20, color: "#2c3d94" }}
                                />
                            </Tooltip>
                        </Link>
                    )}
                    {CAN_UPDATE_ADMIN && (
                        <Link href={`/admin/manage-account/type-admin/update/${record.id}`}>
                            <Tooltip title='cập nhật'>
                                <EditOutlined
                                    style={{ fontSize: 20, color: "#2c3d94" }}
                                />
                            </Tooltip>
                        </Link>
                    )}
                    {CAN_DELETE_ADMIN && (
                        <Tooltip title='xóa'>
                            <DeleteOutlined
                                onClick={() =>
                                    Modal.confirm({
                                        title: "Bạn chắc chắn muốn xóa ?",
                                        onOk: () => {
                                            DeleteMutation.mutate(record.id);
                                        },
                                    })
                                }
                                style={{ fontSize: 20, color: "red" }}
                            />
                        </Tooltip>
                    )}
                </div>
            ),
        },
    ];
    return (
        <section>
            <UrlBreadcrumb breadcrumbs={adminBread} />
            <PageAdminLayout pageName='Danh sách quản trị viên'>
                <div className='flex justify-between gap-8'>
                    <div className='flex gap-4 flex-grow'>
                        <SearchCommon
                            size='middle'
                            placeHolder='Nhập email'
                            className='flex-1'
                            defaultValue={searchEmail}
                            onSearch={(value) => {
                                setSearchEmail(value);
                                onChangeOneParam("email")(value);
                            }}
                        />
                        <SearchCommon
                            size='middle'
                            placeHolder='Nhập họ'
                            className='flex-1'
                            defaultValue={searchFirstname}
                            onSearch={(value) => {
                                setSearchFirstname(value);
                                onChangeOneParam("first_name")(value);
                            }}
                        />
                        <SearchCommon
                            size='middle'
                            placeHolder='Nhập tên'
                            className='flex-1'
                            defaultValue={searchLastName}
                            onSearch={(value) => {
                                setSearchLastName(value);
                                onChangeOneParam("last_name")(value);
                            }}
                        />
                        <SearchCommon
                            size='middle'
                            placeHolder='Nhập số điện thoại'
                            className='flex-1'
                            defaultValue={searchPhoneNumber}
                            onSearch={(value) => {
                                setSearchPhoneNumber(value);
                                onChangeOneParam("phone_number")(value);
                            }}
                        />
                        <Select
                            placeholder='Trạng thái hoạt động'
                            className='flex-1'
                            defaultValue={activeStatus}
                            onSelect={(value) => {
                                setActiveStatus(value);
                                onChangeOneParam("is_active")(value);
                            }}
                        >
                            <Select.Option value={null}>Tất cả</Select.Option>
                            <Select.Option value={1}>Bật</Select.Option>
                            <Select.Option value={0}>Tắt</Select.Option>
                        </Select>
                    </div>
                    {CAN_CREATE_ADMIN && (
                        <Button type='primary'>
                            <Link href='/admin/manage-account/type-admin/create'>Thêm mới</Link>
                        </Button>
                    )}
                </div>
                <Table
                    className='mt-8'
                    columns={column}
                    {...configTable}
                    scroll={{
                        x: 1050,
                    }}
                />
            </PageAdminLayout>
        </section>
    );
}

export default Admin;
