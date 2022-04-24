import React from "react";
import styles from "../../../styles/TopNav.module.css";


const topNav = () => {
    console.log('topNav render');
    return (
        <div className="flex p-8 items-center h-28 justify-between">
            <div className="h-12 flex items-center relative ">
                <input
                    className="py-2.5 pr-16 pl-5 bg-slate-100 text-base outline-green-500 rounded-2xl"
                    type="text"
                    placeholder="Search here..."
                />
                <i class="fa fa-search absolute right-5 "></i>
            </div>
            <div className="flex order-last gap-7">
                <button>
                    <div className="flex items-center">
                        <img
                            className="w-10 rounded-full mr-3"
                            src="https://scontent-sin6-4.xx.fbcdn.net/v/t1.6435-9/57026448_2312504762408862_8620946244446978048_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=174925&_nc_ohc=FJsxARpnf3AAX-mZ_wH&_nc_ht=scontent-sin6-4.xx&oh=00_AT_Y6YSZSQvweEu3xbamdNNyiE3I2m-7MWMv_siA-yp8_g&oe=6288350D"
                            alt="avatar"
                        />
                        <span className="text-base font-semibold">
                            Duy Phan
                        </span>
                    </div>
                </button>
                <div className=" relative flex items-center">
                    <button>
                        <i class={`fa fa-bell ${styles.notify}`}></i>
                        <span
                            className={`absolute rounded-full flex justify-center items-center ${styles.notify_number}`}
                        >
                            12
                        </span>
                    </button>
                </div>
            </div>
            <div></div>
        </div>
    );
};

export default topNav;
