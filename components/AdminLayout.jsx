import React from "react";
import Sidebar from "./Admin/Sidebar/Sidebar";
import TopNav from "./Admin/Topnav";

const AdminLayout = () => {
    return (
        <div className="flex w-screen h-screen">
            <Sidebar />
            <div className="w-screen">
                <TopNav />
            </div>
        </div>
    );
};

export default AdminLayout;
