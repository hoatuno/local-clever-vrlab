import React, { useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Layout, Form, Input, Button, Row, Col, Typography } from 'antd';
import Context from '../context';
import { apiLogin } from '../apis.js';

const { Title } = Typography;
const { Content } = Layout;
const initialValues = { email: 'admin@clevertech.edu.vn', password: '123456' };

// function onChange(checked) {
//   console.log(`switch to ${checked}`);
// }
const Login = () => {
  const [form] = Form.useForm();
  form.setFieldsValue(initialValues);
  const contextObj = useContext(Context);
  const onFinish = async values => {
    const rs = await apiLogin(values.email, values.password);
    if (rs) {
      localStorage.setItem('avatar', rs.data.avatar);
      contextObj.updateContext({
        token: rs.data.token,
        username: rs.data.username,
        idSchool: rs.data.school_id,
        locale: rs.data.locale || 'vi-VN',
        role: rs.data.role,
        schoolName: rs.data.school_name,
        title:
          rs.data.role === 'admin' || rs.data.role === 'school_admin'
            ? 'manager'
            : 'viewer',
      });
    }
  };
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
  if (contextObj.token) {
    return <Navigate to="/schools" />;
  }

  return (
    <Layout className="layout-default">
      <Content className="signin">
        <Row gutter={[12, 0]} justify="space-around">
          <Col
            xs={{ span: 24, offset: 0 }}
            lg={{ span: 12, offset: 2 }}
            md={{ span: 12 }}
          >
            <Title className="mb-15">Sign In</Title>
            <Title className="font-regular text-muted" level={5}>
              Enter your email and password to sign in
            </Title>
            <Form
              form={form}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              layout="vertical"
              className="row-col"
            >
              <Form.Item
                className="username"
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'Please input your email!',
                  },
                ]}
              >
                <Input placeholder="Email" />
              </Form.Item>

              <Form.Item
                className="username"
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}
              >
                <Input type="password" placeholder="Password" />
              </Form.Item>

              {/* <Form.Item
                name="remember"
                className="aligin-center"
                valuePropName="checked"
              >
                <Switch defaultChecked onChange={onChange} />
                Remember me
              </Form.Item> */}

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: '100%' }}
                >
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
    </Layout>
  );
};

export default Login;
