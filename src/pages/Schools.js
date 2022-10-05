import { Col, Row } from 'antd';
import React, { useContext, useEffect } from 'react';
import { apiGetSchools } from '../apis';
import SchoolModal from '../components/modal/SchoolModal';
import { SchoolCard } from '../components/SchoolCard';
import Context from '../context';

const mockSchools = [
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
const Schools = () => {
  const { updateContext } = useContext(Context);

  const [showModal, setShowModal] = React.useState(false);
  const [schools, setSchools] = React.useState(mockSchools);
  const [chosenSchool, setChosenSchool] = React.useState(null);

  const doInit = () => {
    updateContext({ idSchool: null, schoolName: null });
    apiGetSchools().then((shs) => {
      if (shs) setSchools(shs.rows);
    });
  };
  const onPress = (idSchool) => {
    console.log({ idSchool });
  };
  const handleEdit = (school) => {
    setShowModal(true);
    setChosenSchool(school);
  };

  useEffect(doInit, []);
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
            <SchoolCard school={e} setShowModal={handleEdit} doInit={doInit} />
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
