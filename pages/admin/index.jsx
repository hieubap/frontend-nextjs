import { useRouter } from "next/router";
import React, { useEffect } from "react";
import useUser from "../../src/hooks/useUser";
import { isEmpty } from "../../src/utils/opLodash";
import CONSTANT from "../../src/utils/constant";
import { Spin } from "antd";

function Page({ ...props }) {
    const router = useRouter();
    const { manifests, user } = useUser();
    useEffect(() => {
        if (
            isEmpty(user) ||
            !manifests.some((manifest) =>
                [
                    CONSTANT.SUPER_ADMIN_ROLE_ID,
                    CONSTANT.ADMIN_ROLE_ID,
                    CONSTANT.SUB_ADMIN_ROLE_ID,
                ].includes(manifest.id)
            )
        ) {
            router.push("/admin/login");
        }
    }, [user]);
    if (typeof window !== "undefined" && !user) {
        return (
            <div>
                <Spin
                    spinning
                    className='w-screen h-screen flex justify-center items-center'
                />
            </div>
        );
    }
    return <div>home</div>;
}

export default Page;
