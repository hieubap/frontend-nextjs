import React from "react";
import FormLogin from "../src/components/common/FormLogin";

function DashboardLogin({ ...props }) {
    return <FormLogin routePass={"/admin"} bgImage={"/bg1.jpg"} />;
}

export default DashboardLogin;
