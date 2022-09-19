import { Menu, Button } from "antd";
import React from "react";
import MenuItem from "./MenuItem";
import { MENU } from "../constants/Menu";
import { SCHOOLICON } from "../assets/icons/menuIcon";

const color = "blue";
const SideBar = () => {
  return (
    <div className="brand">
      {/* <img src={logo} alt="" /> */}
      <span>VR Lab</span>
      <hr />
      <Menu theme="light" mode="inline">
        {MENU.map((e, idx) => {
          console.log(e);
          return <MenuItem key={idx} content={e.content} icon={e.icon} />;
        })}
        ;
      </Menu>
      <div className="aside-footer">
        <div
          className="footer-box"
          style={{
            background: color,
          }}
        >
          <span className="icon" style={{ color }}>
            {SCHOOLICON}
          </span>
          <h6>Need Help?</h6>
          <p>Please check our docs</p>
          <Button type="primary" className="ant-btn-sm ant-btn-block">
            DOCUMENTATION
          </Button>
        </div>
      </div>
    </div>
  );
};
export default SideBar;
