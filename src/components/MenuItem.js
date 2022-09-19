import React from "react";
import { Menu } from "antd";
import { NavLink } from "react-router-dom";
const MenuItem = ({ content, icon }) => {
  return (
    <Menu.Item>
      <span className="icon">{icon}</span>
      <span className="label">{content}</span>
    </Menu.Item>
  );
};

export default MenuItem;
