import React from "react";
import { useRouter } from "next/router";
import UrlBreadcrumb from "../../../../../src/components/common/UrlBreadcrumb";
import PageAdminLayout from "../../../../../src/components/PageAdminLayout";
import { useQuery } from "react-query";
import AdminModel from "../../../../../src/models/Admin";
import { Col, Row, Spin, Switch } from "antd";
import { GIOI_TINH } from "../../../../../src/utils/constant";
import moment from "moment";

function AdminDetail({ ...props }) {
    const router = useRouter();
    const { id } = router.query;

    const { data, isLoading } = useQuery(
        "getDetailAdmin",
        () => AdminModel.detail(id),
        {
            enabled: !!id,
        }
    );

    const detailAdminBread = [
        {
            name: "Quản lý tài khoản",
        },
        {
            name: "Danh sách quản trị viên",
            url: "/admin/manage-account/type-admin",
        },
        {
            name: "Chi tiết quản trị viên",
        },
    ];
    return (
        <section>
            <UrlBreadcrumb breadcrumbs={detailAdminBread} />
            <PageAdminLayout pageName='Chi tiết quản trị viên'>
                <Spin spinning={isLoading}>
                    <Row className='wrapper-detail'>
                        <Col span={8}>
                            <label>Email</label>
                            <p>{data?.email}</p>
                        </Col>
                        <Col span={8}>
                            <label>Họ</label>
                            <p>{data?.first_name}</p>
                        </Col>
                        <Col span={8}>
                            <label>Tên</label>
                            <p>{data?.last_name}</p>
                        </Col>
                        <Col span={8}>
                            <label>Giới tính</label>
                            <p>
                                {
                                    GIOI_TINH.find(
                                        (i) => i.value === data?.gender
                                    )?.label
                                }
                            </p>
                        </Col>
                        <Col span={8}>
                            <label>Ngày sinh</label>
                            <p>
                                {data?.date_of_birth
                                    ? moment(data?.date_of_birth).format(
                                          "DD/MM/YYYY"
                                      )
                                    : "Không có"}
                            </p>
                        </Col>
                        <Col span={8}>
                            <label>Số điện thoại</label>
                            <p>{data?.phone_number}</p>
                        </Col>
                        <Col span={8}>
                            <label>Liên lạc</label>
                            <p>{data?.contact}</p>
                        </Col>
                        <Col span={8}>
                            <label>Trạng thái</label>
                            <p>
                                <Switch
                                    disabled={true}
                                    checked={data?.is_active === 1}
                                />
                            </p>
                        </Col>
                    </Row>
                </Spin>
            </PageAdminLayout>
        </section>
    );
}

export default AdminDetail;
