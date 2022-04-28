/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { LoginWrapper } from "./LoginWrapper";
const LoginForm = () => {
  return (
    <LoginWrapper>
      <div className="relative py-28">
        <div className="container mx-auto">
          <div className="grid grid-cols-3 ">
            <div className="col-start-2 col-end-3 py-10 flex justify-center bg-slate-700 bg-opacity-50 rounded-2xl">
              <form className="flex flex-col w-4/5" action="#">
                <h1 className="flex justify-center items-center mt-5 mb-12 text-2xl text-white">
                  <span className="text-gr-1 mr-1.5">Login </span> Your Accout
                </h1>
                <label className="mb-4">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                  />
                </label>
                <label className="mb-4">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                  />
                </label>
                <div className="flex justify-between mb-5">
                  <label className="box flex items-center">
                    <input type="checkbox" defaultChecked />
                    Remember me
                    <span className="checkmark"></span>
                  </label>
                  <a
                    className="flex items-center text-white hover:text-gr-1 "
                    href="#"
                  >
                    Forgot password
                  </a>
                </div>
                <button
                  type="submit"
                  className="form-control-btn mb-10 uppercase font-semibold"
                  onClick={() => console.log("click")}
                >
                  Sign in
                </button>
                <p className="text-center text-white">
                  Don't have an account?{" "}
                  <a
                    className=" text-gr-1 opacity-80 hover:opacity-100 hover:text-gr-1 "
                    href="#"
                  >
                    Sign up now
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </LoginWrapper>
  );
};

export default LoginForm;
