import React  from "react";


function PageAdminLayout({ pageName, children, ...props }) {
    return (
        <div className='bg-white border rounded-lg w-full min-h-screen p-6 tablet:p-4 mt-2'>
            <h2 className='uppercase font-semibold text-xl mb-6'>{pageName}</h2>
            {children}
        </div>
    );
}

export default PageAdminLayout;
