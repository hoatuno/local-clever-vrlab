import { Col, Row } from 'antd';
import React from 'react';
import SchoolModal from '../components/modal/SchoolModal';
import { SchoolCard } from '../components/SchoolCard';

const schools = [
  { idSchool: 'NH1', name: 'Nguyen Hue', description: 'School of Nguyen Hue' },
  { idSchool: 'NH1', name: 'Nguyen Hue', description: 'School of Nguyen Hue' },
  { idSchool: 'NH1', name: 'Nguyen Hue', description: 'School of Nguyen Hue' },
  { idSchool: 'NH1', name: 'Nguyen Hue', description: 'School of Nguyen Hue' },
  {
    idSchool: 'NTT2',
    name: 'Nguyen Tat Thanh',
    description: 'School of Nguyen Tat Thanh',
  },
];
// {
//   idSchool, name, description;
// }
const Schools = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [chosenSchool, setChosenSchool] = React.useState(null);
  const onPress = (idSchool) => {
    console.log({ idSchool });
  };
  const handleEdit = (school) => {
    setShowModal(true);
    setChosenSchool(school);
  };
  return (
    <div className="layout-content">
      <Row className="rowgap-vbox" gutter={[24, 0]}>
        {schools.map((e, idx) => (
          <Col
            key={idx}
            xs={24}
            sm={24}
            md={12}
            lg={12}
            xl={8}
            className="mb-24"
            onClick={() => onPress(e.idSchool)}
          >
            <SchoolCard school={e} setShowModal={handleEdit} />
          </Col>
        ))}
      </Row>
      <SchoolModal
        open={showModal}
        school={chosenSchool}
        close={() => setShowModal(false)}
      />
    </div>
  );
};
export default Schools;
