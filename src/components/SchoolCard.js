import { Card, Typography } from 'antd';
import React, { useContext } from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useConfirmDeleteSchool } from '../apis';
import jwtDecode from 'jwt-decode';
import Context from '../context';
export const SchoolCard = ({ school, setShowModal, doInit }) => {
  const apiDeleteSchool = useConfirmDeleteSchool();
  const { updateContext } = useContext(Context);
  const { Title } = Typography;
  const { idSchool, name, description } = school;

  const handleDelete = async () => {
    let res = await apiDeleteSchool(idSchool);
    if (res) doInit();
  };
  const reInstallContext = () => {
    const token = localStorage.getItem('token');
    if (token) {
      const { username, role, locale } = jwtDecode(token);
      updateContext({
        idSchool: idSchool,
        schoolName: name,
        username,
        role,
        locale,
        token,
        title:
          role === 'admin' || role === 'school_admin' ? 'manager' : 'viewer',
      });
    }
  };
  return (
    <Card
      bordered={false}
      className="criclebox h-full text-center "
      onClick={() => reInstallContext()}
    >
      <div className="h-full col-content p-20">
        <div className="ant-muse">
          <Title level={5}>{name}</Title>
          <p>{idSchool}</p>
        </div>
        <div className="card-footer">{description}</div>
        <div className="icon-school">
          <EditOutlined onClick={() => setShowModal(school)} />
          <DeleteOutlined onClick={handleDelete} />
        </div>
      </div>
    </Card>
  );
};
