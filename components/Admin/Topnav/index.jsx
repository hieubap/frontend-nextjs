/* eslint-disable @next/next/no-img-element */
import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import DropDown from "../Dropdown";
const topNav = () => {
  console.log("topNav render");
  return (
    <div className="flex p-8 items-center h-28 justify-between">
      <div className="h-12 flex items-center relative ">
        <input
          className="py-2.5 pr-16 pl-5 bg-slate-100 text-base outline-green-500 rounded-2xl"
          type="text"
          placeholder="Search here..."
        />
        <i className="fa fa-search absolute right-5 "></i>
      </div>
      <div className="flex order-last gap-7 mr-8">
        <div>
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button>
                <div className="flex items-center">
                  <img
                    src="https://scontent-sin6-4.xx.fbcdn.net/v/t1.6435-9/57026448_2312504762408862_8620946244446978048_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=174925&_nc_ohc=FJsxARpnf3AAX-mZ_wH&_nc_ht=scontent-sin6-4.xx&oh=00_AT_Y6YSZSQvweEu3xbamdNNyiE3I2m-7MWMv_siA-yp8_g&oe=6288350D"
                    alt=""
                    className="text-base font-semibold ml-3 w-10 h-10 rounded-full"
                  />
                  <span className="text-base font-semibold ml-3">Duy Phan</span>
                </div>
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition cubic-bezier(0.175, 0.885, 0.32, 1.275) duration-500"
                enterFrom="transform scale-0"
                enterTo="transform scale-1"
                leave="transition ease-0 duration-300"
                leaveFrom="transform scale-1"
                leaveTo="transform scale-0"
              >
                <Menu.Items className="absolute right-0 w-40 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <DropDown noti={false} />
                </Menu.Items>
              </Transition>
            </div>
          </Menu>
        </div>
        <div>
          <Menu as="div" className="relative w-full h-full text-left">
            <div className=" relative w-full h-full flex items-center">
              <Menu.Button>
                <i
                  className={`fa fa-bell before:text-3xl before:text-gray-500 mr-4`}
                ></i>
                <span
                  className={`absolute rounded-full flex justify-center items-center -top-2 right-1 w-6 h-6 bg-secondary text-white text-xs`}
                >
                  12
                </span>
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition cubic-bezier(0.175, 0.885, 0.32, 1.275) duration-500"
                enterFrom="transform scale-0"
                enterTo="transform scale-1"
                leave="transition ease-0 duration-300"
                leaveFrom="transform scale-1"
                leaveTo="transform scale-0"
              >
                <Menu.Items className="absolute right-0 top-12 w-96 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <DropDown noti={true} />
                </Menu.Items>
              </Transition>
            </div>
          </Menu>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default topNav;
