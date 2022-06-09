import { Tabs } from "antd";
import React from "react";
import Breadcrumb from "../../../src/components/Breadcrumb";
import ChangePassword from "../../../src/container/change-password";
import InfoAccount from "../../../src/container/info-account";
import { WrapperContainer } from "../../../src/layout/style/styled";

const index = (props) => {
    const breadcrumb = [
        { title: "Quản lý tài khoản" },
        { title: "Thông tin tài khoản" },
    ];
    return (
        <WrapperContainer>
            <Breadcrumb data={breadcrumb} />
            <div className='wrap-tabs'>
                <Tabs type='line'>
                    <Tabs.TabPane key={0} tab='Chỉnh sửa thông tin tài khoản'>
                        <InfoAccount />
                    </Tabs.TabPane>
                    <Tabs.TabPane key={1} tab='Đổi mật khẩu'>
                        <ChangePassword />
                    </Tabs.TabPane>
                </Tabs>
            </div>
        </WrapperContainer>
    );
};

export default index;
