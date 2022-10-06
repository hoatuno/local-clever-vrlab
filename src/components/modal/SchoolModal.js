import React from 'react';
import { Modal, Form, Input } from 'antd';
import { useEffect } from 'react';
import { apiEditSchool, apiNewSchool } from '../../apis';
// import { useIntl } from 'react-intl';
const SchoolModal = ({ open, school, close, doInit }) => {
  // const { formatMessage: tr } = useIntl();
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldValue('name', (school || {}).name);
    form.setFieldValue('description', (school || {}).description);
  }, [school]);
  const onSave = () => {
    try {
      form
        .validateFields()
        .then(async (values) => {
          const { name, description } = values;
          const newSchool = { id: school.id, name, description };
          if (school.id) await apiEditSchool(school.id, newSchool);
          else await apiNewSchool(newSchool);
          await doInit();
        })
    } catch (error) {
      console.log(error);
    }
    finally {
      close();
    }
  };
  return (
    <Modal
      title={(school || {}).id ? 'Edit School' : 'Create School'}
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
