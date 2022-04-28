import styled from "styled-components";
export const LoginWrapper = styled.div`
  .form-control {
    height: 50px;
    width: 100%;
    padding: 6px 20px;
    line-height: 1.5;
    font-size: 16px;
    border: 1px solid transparent;
    background: rgba(255, 255, 255, 0.08);
    color: #fff;
    border-radius: 40px;
    transition: all 0.3s;
    &::placeholder {
      color: #fff;
    }
    &:focus-visible {
      outline: none;
      box-shadow: none;
    }
    &:focus {
      border-color: rgba(255, 255, 255, 0.4);
      outline: none;
      box-shadow: none;
      background: transparent;
    }
    &:hover {
      background: transparent;
      outline: none;
      box-shadow: none;
      border-color: rgba(255, 255, 255, 0.4);
    }
  }
  .form-control-btn {
    background: rgb(72, 205, 77);
    height: 50px;
    width: 100%;
    padding: 6px 20px;
    line-height: 1.5;
    font-size: 16px;
    color: #fff;
    border-radius: 40px;
    transition: all 0.3s;
    &:hover {
      border: none;
    }
    &:focus {
      border: none;
    }
  }

  .box {
    display: block;
    position: relative;
    padding-left: 20px;
    cursor: pointer;
    font-size: 16px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    color: rgb(86, 255, 92);
  }
  .box input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  .checkmark {
    position: absolute;
    top: 6px;
    left: -1px;
    height: 17px;
    width: 17px;
    background-color: rgba(255, 255, 255, 0.08);
    transition: all 0.3s;
  }

  .box:hover input ~ .checkmark {
    opacity: 1;
  }

  .box input:checked ~ .checkmark {
    background-color: rgb(72, 205, 77);
  }

  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }
  .box input:checked ~ .checkmark:after {
    display: block;
  }
  .box .checkmark:after {
    left: 6px;
    top: 2px;
    width: 6px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
`;
