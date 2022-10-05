import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  Row,
  Col,
  // Breadcrumb,
  Dropdown,
  Button,
  Menu,
  // Input,
  // Drawer,
  // Typography,
  // Switch,
} from 'antd';
import {
  MenuOutlined,
  SettingOutlined,
  LogoutOutlined,
  SkinFilled,
  ToolFilled,
} from '@ant-design/icons';
import Context from '../../context';

const getItem = (label, key, icon, children) => {
  return {
    key,
    icon,
    children,
    label,
  };
};

const Header = ({ onPress }) => {
  const { updateContext } = React.useContext(Context);
  let { pathname } = useLocation();
  pathname = pathname.replace('/', '');

  const menu = (
    <Menu
      items={[
        getItem('My Profile', '1', <SkinFilled />),
        getItem('Change password', '2', <ToolFilled />),
        getItem(
          <span onClick={() => updateContext({ token: null })}>Log out</span>,
          '3',
          <LogoutOutlined />
        ),
      ]}
    />
  );

  return (
    <>
      <Row gutter={[24, 0]}>
        <Col span={24} md={6}>
          <div className="ant-page-header-heading">
            <span
              className="ant-page-header-heading-title"
              style={{ textTransform: 'capitalize' }}
            >
              {pathname}
            </span>
          </div>
        </Col>
        <Col span={24} md={18} className="header-control">
          <Button type="link">
            <Dropdown overlay={menu} trigger={['click']}>
              <SettingOutlined />
            </Dropdown>
          </Button>
          <Button
            className="sidebar-toggler"
            type="link"
            onClick={() => onPress()}
          >
            <MenuOutlined />
          </Button>
        </Col>
      </Row>
    </>
  );
};
export default Header;
