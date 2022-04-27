import React from "react";
import Sidebar from "./Admin/Sidebar/Sidebar";
import TopNav from "./Admin/Topnav";

export default function AdminLayout({ children }) {
  return (
    <div className="flex w-screen h-screen">
      <Sidebar />
      <div className="w-screen">
        <TopNav />
        <div className="container p-8">{children}</div>
      </div>
    </div>
  );
}
