import React, { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

const Home = () => {
  const [activeKey, setActiveKey] = useState('1');

  const handleAccordionChange = (eventKey) => {
    setActiveKey(eventKey);
  };

  return (
    <div>
    

    </div>
  );
};

export default Home;
