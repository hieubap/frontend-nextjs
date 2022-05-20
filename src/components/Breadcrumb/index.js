import React from "react";
import { Breadcrumb as Bread } from "antd";

const Breadcrumb = ({ data }) => {
    return (
        <Bread>
            {data.map((item, index) => (
                <Bread.Item>{item.title}</Bread.Item>
            ))}
        </Bread>
    );
};

Breadcrumb.propTypes = {};

export default Breadcrumb;
