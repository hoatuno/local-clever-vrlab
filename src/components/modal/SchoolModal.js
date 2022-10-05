import React from 'react';
import { Modal, Form, Input } from 'antd';
import { useEffect } from 'react';
// import { useIntl } from 'react-intl';
const SchoolModal = ({ open, school, close }) => {
  // const { formatMessage: tr } = useIntl();
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldValue('name', (school || {}).name);
    form.setFieldValue('description', (school || {}).description);
  }, [school]);
  const onSave = () => {
    form
      .validateFields()
      .then((values) => {
        console.log({ values });
        close();
      })
      .catch((err) => {
        console.log({ err });
      });
  };
  return (
    <Modal
      title={(school || {}).idSchool ? 'Edit School' : 'Create School'}
      open={open}
      onClose={close}
      onOk={onSave}
      onCancel={close}
    >
      <Form form={form} onFinish={onSave} layout="vertical">
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Require' }]}
        >
          <Input type="text" placeholder="please enter name of school" />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: 'Require' }]}
        >
          <Input type="text" placeholder="please enter description of school" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SchoolModal;
