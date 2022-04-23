import React from "react";
import SidebarItem from "./SidebarItem";
import sidebar_items from "../../../JsonData/sidebar_routes.json";
import Link from "next/link";
import { useRouter } from "next/router";

const Sidebar = () => {
    const router = useRouter().asPath.slice(7);
    let activeItem;
    if (router !== "[route]") {
        activeItem = sidebar_items.findIndex(item => item.route === router);
    } else {
        activeItem = -1;
    }
    return (
        <div
            className="w-96 drop-shadow-md"
            style={{
                boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            }}
        >
            <div className="h-32 flex justify-center items-center">
                <img
                    src="https://png2.cleanpng.com/sh/318a01dcfbc3df7bcbd1c745daa93b37/L0KzQYm3V8EyN5R7g5H0aYP2gLBuTflvbJD0ip9qaYKwgcbojPl1gV5mgeQ2cHBvfMb7if9vNZJuip95dYLsdrrskwMubKZ4Rdh7ZYPrPbLwkr02amU6eaRvY0LmQILsWL42PWc1SaUDMUG4Q4K5WcA0PmU2UKI8LoDxd1==/kisspng-indoor-air-quality-air-pollution-air-purifiers-dus-fresh-air-5b45a2fc2c01e8.5560138115312903641803.png"
                    alt=""
                    className="w-20 h-18"
                />
                <span className="text-sky-600 text-3xl font-bold">
                    Airsence
                </span>
            </div>
            {activeItem != -1 &&
                sidebar_items.map((item, index) => (
                    <Link key={index} href={`/admin/${item.route}`} passHref>
                        <a href={`/admin/${item.route}`}>
                            <SidebarItem
                                title={item.display_name}
                                icon={item.icon}
                                active={index === activeItem}
                            />
                        </a>
                    </Link>
                ))}
        </div>
    );
};

export default Sidebar;
