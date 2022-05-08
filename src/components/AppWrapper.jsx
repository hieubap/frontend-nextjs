import React, { useEffect, useState } from "react";
import useUser from '../../hooks/useUser';

function AppWrapper({ children, queryClient, ...props }) {
    let { user } = useUser();
    useEffect(() => {
        queryClient.clear();
    }, [user?.id]);
    return <section>{children}</section>;
}

export default AppWrapper;
