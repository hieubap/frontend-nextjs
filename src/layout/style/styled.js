import styled from "styled-components";

export const WrapperContainer = styled.div`
    padding: 20px;
    .ant-breadcrumb {
        margin-bottom: 15px;
    }
    .wrap-table {
        /* padding: 10px; */
        thead {
            .ant-table-cell {
                background-color: #c4c4c4;
                color: black;
            }
        }
        .ant-table-pagination {
            justify-content: center;
        }
    }
    .wrap-tabs {
        .ant-tabs-tab-btn {
            font-size: 16px;
        }
        .ant-tabs-tab-active {
            border-bottom: 2px solid #2c3d94;
            .ant-tabs-tab-btn {
                color: #2c3d94;
            }
        }
    }
`;