import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useUser from "../../src/hooks/useUser";
import { isEmpty } from "../../src/utils/opLodash";
import { Spin } from "antd";

function Page({ ...props }) {
    const router = useRouter();
    const { user } = useUser();
    const [isSpin, setSpin] = useState(false);
    useEffect(() => {
        if (isEmpty(user)) {
            setSpin(true);
            router.push("/dashboard-login");
        }
    }, [user]);

    return (
        <div>
            <Spin
                spinning={isSpin}
                className='w-screen h-screen flex justify-center items-center'
            >
                <div suppressHydrationWarning>home</div>
            </Spin>
        </div>
    );
}

export default Page;
