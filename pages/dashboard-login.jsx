import React from "react";
import FormLogin from "../components/common/FormLogin";



function AdminLogin({ ...props }) {
    return <FormLogin routePass={'/admin'} bgImage={'/bg1.jpg'}/>;
}

export default AdminLogin;