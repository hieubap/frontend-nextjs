import { useRouter } from "next/router";
import React, { useEffect } from "react";
import AdminLayout from "../../components/AdminLayout";
import useUser from "../../hooks/useUser";
import { isEmpty } from "../../utils/opLodash";
import CONSTANT from '../../utils/constant'
import { Spin } from "antd";

const Page = () => {
    const {user , manifests} = useUser()
    const router = useRouter()
    useEffect(()=>{
        if(isEmpty(user) || !manifests.some(manifest=>[CONSTANT.SUPER_ADMIN_ROLE_ID ,CONSTANT.ADMIN_ROLE_ID , CONSTANT.SUB_ADMIN_ROLE_ID].includes(manifest))){
            router.push('/admin/login')
        }
    },[user])
    if(isEmpty(user)){
        return (<div  className="h-screen w-screen flex items-center justify-center">
            <Spin/>
        </div>)
    }
    return <AdminLayout >
        <h1>hello</h1>
    </AdminLayout>;
};

export default Page;
