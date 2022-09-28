import { Menu } from 'antd';
import React from 'react';
import MenuItem from './MenuItem';
import { ADMINSTRATORMENU, MENU } from '../../constants/Menu';

const SideBar = () => {
  return (
    <>
      <div className="brand">
        {/* <img src={logo} alt="" /> */}
        <span>VR Lab</span>
      </div>
      <hr />
      <Menu theme="light" mode="inline">
        {MENU.map(e => {
          return <MenuItem key={e.key} content={e.label} icon={e.icon} path={e.path} />;
        })}
        <Menu.Item key="admin" className="menu-item-header">
          Adminstration
        </Menu.Item>
        {ADMINSTRATORMENU.map((e, idx) => {
          return <MenuItem key={e.key} content={e.label} icon={e.icon} path={e.path} />;
        })}
      </Menu>
    </>
  );
};
export default SideBar;
