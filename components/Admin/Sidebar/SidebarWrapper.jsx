import styled from "styled-components";
export const SidebarWrapper = styled.div`
    .sidebar_item {
        span {
            transition: all 0.5s;
        }
        .active {
            border-radius: 16px;
            background-image: linear-gradient(to right, #019707, #4caf50);
            span {
                color: #fff;
            }
        }
    }
`;
