import React from "react";
import { useLocation } from "react-router-dom";
import {
  Row,
  Col,
  Breadcrumb,
  // Badge,
  // Dropdown,
  // Button,
  // List,
  // Avatar,
  // Input,
  // Drawer,
  // Typography,
  // Switch,
} from "antd";
function Header() {
  let { pathname } = useLocation();
  pathname = pathname.replace("/", "");
  return (
    <>
      <Row gutter={[24, 0]}>
        <Col span={24} md={6}>
          {/* <Breadcrumb>
            <Breadcrumb.Item style={{ textTransform: "capitalize" }}>
              {pathname}
            </Breadcrumb.Item>
          </Breadcrumb> */}
          <div className="ant-page-header-heading">
            <span
              className="ant-page-header-heading-title"
              style={{ textTransform: "capitalize" }}
            >
              {pathname}
            </span>
          </div>
        </Col>
      </Row>
    </>
  );
}
export default Header;
