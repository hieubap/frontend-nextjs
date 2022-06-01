import React, { useEffect, useState } from "react";
import { Avatar, Button, Drawer, Menu } from "antd";
import {
    CodeOutlined,
    FileSearchOutlined,
    NodeIndexOutlined,
    SettingOutlined,
    TeamOutlined,
    UnorderedListOutlined,
    UserOutlined,
} from "@ant-design/icons";
// import MenuBar from "./common/MenuBar";
import dynamic from "next/dynamic";
import useScreenDetect from "../hooks/useScreenDetect";
import useUser from "../hooks/useUser";
import AIRSENSE from "../models/AIRSENSE";
import { FEATURE_PERMISSION } from "../utils/constant";

const MenuBar = dynamic(() => import("./common/MenuBar"), { ssr: false });

export default function AdminLayout({ children }) {
    let {  permissions } = useUser();

    const menuList = (permissions) => [
        {
            id: 1,
            title: "Quản lý tài khoản",
            icon: <UserOutlined />,
            isHide: false,
            children: [
                {
                    id: "1.2",
                    title: "Danh sách khách hàng",
                    isHide: !AIRSENSE.canAccessFuture(
                        FEATURE_PERMISSION.SEARCH_CUSTOMER,
                        permissions
                    ),
                    url: "/admin/manage-account/customer",
                },
                {
                    id: "1.3",
                    title: "Danh sách quản trị viên",
                    url: "/admin/manage-account/collaborator",
                    isHide: !AIRSENSE.canAccessFuture(
                        FEATURE_PERMISSION.SEARCH_ADMIN,
                        permissions
                    ),
                },
            ],
        },
        {
            id: 2,
            title: "Quản lý phân quyền",
            icon: <TeamOutlined />,
            isHide: false,
            children: [
                {
                    id: "2.2",
                    title: "Danh sách chức vụ",
                    url: "/admin/manifest",
                    isHide: !AIRSENSE.canAccessFuture(
                        FEATURE_PERMISSION.SEARCH_MANIFEST,
                        permissions
                    ),
                },
            ],
        },
        {
            id: 3,
            title: "Quản lý thiết bị",
            icon: <NodeIndexOutlined />,
            isHide: false,
            children: [
                {
                    id: "3.2",
                    title: "Danh sách thiết bị",
                    isHide: false,
                },
                {
                    id: "3.3",
                    title: "Thống kê",
                    isHide: false,
                },
            ],
        },
        {
            id: 4,
            title: "Quản lý bài viết",
            icon: <FileSearchOutlined />,
            isHide: false,
            children: [
                {
                    id: "4.2",
                    title: "Danh sách bài viết",
                    isHide: false,
                },
                {
                    id: "4.3",
                    title: "Bình luận đọc giả",
                    isHide: false,
                },
                {
                    id: "4.4",
                    title: "Thống kê",
                    isHide: false,
                },
            ],
        },
        {
            id: 5,
            title: "Quản lý khóa học",
            icon: <CodeOutlined />,
            isHide: false,
            children: [
                {
                    id: "5.2",
                    title: "Danh sách khóa học",
                    isHide: false,
                },
                {
                    id: "5.3",
                    title: "Hóa đơn",
                    isHide: false,
                },
                {
                    id: "5.4",
                    title: "Thống kê",
                    isHide: false,
                },
            ],
        },
        {
            id: 6,
            title: "Quản lý cấu hình",
            icon: <SettingOutlined />,
            isHide: false,
        },
    ];
    const [isShowDrawer, setShowDrawer] = useState(false);
    const { isTablet, isMobile } = useScreenDetect();
    useEffect(() => {
        if (!isMobile && !isTablet) {
            setShowDrawer(false);
        }
    }, [isMobile, isTablet]);
    console.log(permissions);
    return (
        <section>
            <Drawer
                title='Menu'
                placement='top'
                height='100vh'
                onClose={() => setShowDrawer(false)}
                visible={isShowDrawer}
                bodyStyle={{ padding: 0 }}
            >
                <MenuBar
                    className='w-full min-h-max overflow-auto overflow-x-hidden beauty-scroll text-base'
                    mode='inline'
                    menuList={menuList(permissions || [])}
                />
            </Drawer>
            <div
                className='flex justify-between px-4 items-center w-full bg-white
                            h-20 tablet:h-16 mobile:h-14
                            shadow-xl fixed z-max top-0'
            >
                <div>logo</div>
                <div className='flex tablet:gap-4 mobile:gap-3'>
                    <Avatar>S</Avatar>
                    <Button
                        type='text'
                        className='hidden tablet:block px-2'
                        onClick={() => setShowDrawer(true)}
                    >
                        <UnorderedListOutlined className='text-xl flex items-center font-bold' />
                    </Button>
                </div>
            </div>
            <div className='flex'>
                <div className='h-screen pt-22 w-64 fixed left-0 top-0 tablet:hidden'>
                    <MenuBar
                        className='h-full overflow-auto overflow-x-hidden beauty-scroll text-base'
                        mode='inline'
                        menuList={menuList(permissions || [])}
                    />
                </div>
                <div
                    className='bg-main w-full
                        p-8 tablet:p-6 mobile:p-4
                        ml-64 tablet:ml-0
                        mt-20'
                >
                    <div className='bg-white shadow-lg w-full min-h-screen'>
                        {children}
                    </div>
                </div>
            </div>
        </section>
    );
}
