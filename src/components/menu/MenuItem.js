import React from "react";
import { Menu } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import { APPCOLOR } from "../../constants/Menu";
const MenuItem = ({ content, icon, path }) => {
  const { pathname } = useLocation();
  const page = pathname.replace("/", "");
  const { Item } = Menu;

  return (
    <Item>
      <NavLink to={path}>
        <span
          className="icon"
          style={{
            background: page === path ? APPCOLOR : "",
          }}
        >
          {icon}
        </span>
        <span className="label">{content}</span>
      </NavLink>
    </Item>
  );
};

export default MenuItem;
