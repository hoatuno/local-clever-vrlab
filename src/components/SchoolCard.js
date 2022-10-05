import { Card, Typography } from 'antd';
import React from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

export const SchoolCard = ({ school, setShowModal }) => {
  const { Title } = Typography;
  return (
    <Card bordered={false} className="criclebox h-full text-center ">
      <div className="h-full col-content p-20">
        <div className="ant-muse">
          <Title level={5}>{school.name}</Title>
          <p>{school.idSchool}</p>
        </div>
        <div className="card-footer">{school.description}</div>
        <div className="icon-school">
          <EditOutlined onClick={() => setShowModal(school)} />
          <DeleteOutlined />
        </div>
      </div>
    </Card>
  );
};
