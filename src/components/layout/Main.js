import React, { useState } from 'react';
import { Layout, Drawer } from 'antd';
import { Outlet } from 'react-router-dom';
import SideBar from '../menu/SideBar';
import Header from './Header';

const { Header: AntHeader, Content, Sider } = Layout;
function Main({ children }) {
  const [visible, setVisible] = useState(false);

  const openDrawer = () => setVisible(!visible);
  return (
    <Layout className="layout-dashboard">
      <Drawer
        title={false}
        placement="left"
        closable={false}
        open={false}
        onClose={() => setVisible(false)}
        visible={visible}
        key="right"
        width={250}
        className="drawer-sidebar"
      >
        <Layout className="layout-dashboard">
          <Sider
            trigger={null}
            width={250}
            theme="light"
            className="sider-primary ant-layout-sider-primary "
            style={{ background: 'transparent' }}
          >
            <SideBar />
          </Sider>
        </Layout>
      </Drawer>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        trigger={null}
        width={250}
        theme="light"
        className="sider-primary ant-layout-sider-primary "
        style={{ background: 'transparent' }}
      >
        <SideBar />
      </Sider>
      <Layout>
        <AntHeader className="ant-header-fixed">
          <Header onPress={openDrawer} />
        </AntHeader>
        <Content className="content-ant">
          {children}
          <Outlet />
        </Content>
        {/* <Footer /> */}
      </Layout>
    </Layout>
  );
}

export default Main;
