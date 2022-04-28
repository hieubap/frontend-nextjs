/* eslint-disable no-const-assign */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Menu } from "@headlessui/react";
import user_menu from "../../../JsonData/user_menus.json";
import noti_menu from "../../../JsonData/notification.json";
const dropDown = ({ noti }) => {
  const list = user_menu;
  if (noti) {
    list = noti_menu;
  }
  return (
    <div>
      {list.map((item, index) => (
        <Menu.Item key={index}>
          {({ active }) =>
            noti ? (
              <div
                className={`${
                  active ? "bg-white-2" : "text-gray-500"
                } group flex rounded-md items-center w-full p-5 text-sm`}
              >
                <i className={`mt-0.5 mr-5 before:text-2xl ${item.icon}`}></i>
                <span className="text-lg">{item.content}</span>
              </div>
            ) : (
              <a
                href={`${item.link}`}
                className={`${
                  active ? "bg-white-2" : "text-gray-500"
                } group flex rounded-md items-center w-full p-5 text-sm hover:text-primary`}
              >
                <i className={`mt-0.5 mr-5 before:text-2xl ${item.icon}`}></i>
                <span className="text-lg">{item.content}</span>
              </a>
            )
          }
        </Menu.Item>
      ))}
    </div>
  );
};

export default dropDown;
