import React, { useEffect, useState } from "react";
import useUser from '../hooks/useUser';

function AppWrapper({ children, ...props }) {
    let { user } = useUser();
    // useEffect(() => {
    //     queryClient.clear();
    // }, [user?.id]);
    return <section>{children}</section>;
}

export default AppWrapper;
