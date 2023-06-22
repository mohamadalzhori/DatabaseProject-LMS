import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Marks from './Marks';
import PointsDashboard from './PointsDashboard';
import SuccessStories from './SuccessStories';
function TeacherDash() {


  return (
    <div>
      <h1>Hello, {sessionStorage.getItem('username')}</h1>

      <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
      <Row>
        <Col sm={4}>
          <ListGroup>
            <ListGroup.Item action href="#link1">
              Marks Form
            </ListGroup.Item>
            <ListGroup.Item action href="#link2">
              Points Dashboard
            </ListGroup.Item>
            <ListGroup.Item action href="#link3">
              Success Stories
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col sm={8}>
          <Tab.Content>
            <Tab.Pane eventKey="#link1">
                <Marks />
            </Tab.Pane>
            <Tab.Pane eventKey="#link2">
                <PointsDashboard />
            </Tab.Pane>
            <Tab.Pane eventKey="#link3">
                <SuccessStories />
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>

    </div>
  );
}

export default TeacherDash;
