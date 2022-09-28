import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Form, Input, Button, Row, Col, Typography, Switch } from 'antd';

const { Title } = Typography;
const { Content } = Layout;

function onChange(checked) {
  console.log(`switch to ${checked}`);
}
const Login = () => {
  const onFinish = values => {
    console.log('Success:', values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    // <Layout className="layout-default layout-signin">
    <Content className="signin">
      <Row gutter={[12, 0]} justify="space-around">
        <Col xs={{ span: 24, offset: 0 }} lg={{ span: 12, offset: 2 }} md={{ span: 12 }}>
          <Title className="mb-15">Sign In</Title>
          <Title className="font-regular text-muted" level={5}>
            Enter your email and password to sign in
          </Title>
          <Form
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="vertical"
            className="row-col">
            <Form.Item
              className="username"
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your email!'
                }
              ]}>
              <Input placeholder="Email" />
            </Form.Item>

            <Form.Item
              className="username"
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!'
                }
              ]}>
              <Input type="password" placeholder="Password" />
            </Form.Item>

            <Form.Item name="remember" className="aligin-center" valuePropName="checked">
              <Switch defaultChecked onChange={onChange} />
              Remember me
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                SIGN IN
              </Button>
            </Form.Item>
            <p className="font-semibold text-muted">
              Don't have an account?{' '}
              <Link to="/sign-up" className="text-dark font-bold">
                Sign Up
              </Link>
            </p>
          </Form>
        </Col>
      </Row>
    </Content>
    // </Layout>
  );
};

export default Login;
