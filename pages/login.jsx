import React, { useState } from "react";
import FormLogin from "../src/components/forms/FormLogin";

function Login() {
    return <FormLogin bgImage={"/bg2.jpg"} routePass={"/admin/customer"} />;
}

export default Login;
