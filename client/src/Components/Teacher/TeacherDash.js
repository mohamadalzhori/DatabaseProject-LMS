import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import Marks from "./Marks";
import PointsDashboard from "./PointsDashboard";
import SuccessStories from "./SuccessStories";
import Attendance from "./Attendance";
function TeacherDash() {
  return (
    <div>
      <style>
        {`
          .list-group-item.active {
            background-color: #198754;
            border-color: #198754;
        `}
      </style>
      <div id="heading">
        <h3>Hello, {sessionStorage.getItem("username")}</h3>
      </div>
      <div className="d-flex justify-content-center">
        <Tab.Container defaultActiveKey="#link1">
          <Row>
            <Col sm={2}>
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
                <ListGroup.Item action href="#link4">
                  Attendance
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col style={{ marginLeft: "2%" }}>
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
                <Tab.Pane eventKey="#link4">
                  <Attendance />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    </div>
  );
}

export default TeacherDash;
