import React from 'react';
import { Descriptions, Row, Col, Avatar } from 'antd';
import rohit from './dev_images/IMG_20240517_191910.jpg';
import Virsen from './dev_images/leon.webp'; // Update this line

const Project = () => {
  const developers = [
    {
      name: 'ROHIT DAS',
      role: 'Full Stack Dev',
      description: "As you know Your's truly is the GOD of this website. Spent almost 100 hours to build this, I take my salary in the form of vadapavs. Uptill now I got 0 vadapavs (I want my vadapav now). Where are you our CEO? Oh, and I also did an internship under AIZEN (HAIL AIZEN SAMA)",
      image: rohit,
    },
    {
      name: 'Virsen ',
      role: 'C E O',
      description: "I am currently on a mission to rescue the President's daughter. Ada is distracting me with her moves, I haven't eat anything for the past week and this guy wants fuxking vadapav.",
      image: Virsen,
    },
  ];

  return (
    <div style={{ padding: '20px', marginTop: '0px'}}>
      <h1>About Us</h1>

      <Row gutter={16}>
        {developers.map((dev, index) => (
          <Col span={12} key={index}>
            {/* Avatar Above Name */}
            <div style={{ textAlign: 'left' }}>
              <Avatar size={100} src={dev.image} style={{ marginBottom: '10px' }} />
              <h2>{dev.name}</h2>
            </div>
            {/* Developer Details Section */}
            <Descriptions title="Developer Details" bordered>
              <Descriptions.Item label={dev.name} key={index}>
                <p><strong>Role:</strong> {dev.role}</p>
                <p><strong>Description:</strong> {dev.description}</p>
              </Descriptions.Item>
            </Descriptions>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Project;
