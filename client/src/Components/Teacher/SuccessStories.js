import React from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { useEffect, useState } from "react";
function SuccessStories(props) {
  const [studentName, setStudentName] = useState("");
  const [student_id, setStudentId] = useState("");
  const [description, setDescription] = useState("");
  const [month, setMonth] = useState("");

  const { studentOptions } = props;

  const handleSubmit = (event) => {
    // In browsers the defaul submit reloads the page but we don't want this, we want to navigate to a certain page so we disable the default submit behaviour
    event.preventDefault();

    const data = {
      month,
      name: studentName,
      description,
      student_id,
    };

    console.log(data);

    axios
      .post("http://localhost:8080/successStory/add", data)
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          alert("Success Story Submitted Successfully");

          setMonth("");
          setStudentName("");
          setDescription("");
          setStudentId("");
        }
      });
  };

  const remainingCharacters = 255 - description.length;

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col>
            <Form.Group>
              <Form.Label>
                <b>Student name</b>
              </Form.Label>
              <Form.Select
                required
                aria-label="Default select example"
                value={student_id}
                onChange={(e) => {
                  const selectedStudentId = e.target.value;
                  const selectedStudent = studentOptions.find(
                    (student) => student.sId === parseInt(selectedStudentId)
                  );

                  setStudentId(selectedStudentId);
                  setStudentName(selectedStudent ? selectedStudent.sName : "");
                }}
              >
                <option value="">Select a Student</option>
                {studentOptions?.map((student) => (
                  <option key={student.sId} value={student.sId}>
                    {student.sName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>
                <b>Month</b>
              </Form.Label>
              <Form.Select
                required
                value={month}
                aria-label="Default select example"
                onChange={(e) => {
                  setMonth(e.target.value);
                }}
              >
                <option value="">Select a Month</option>
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <br />
        <Row>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <h3>
              <Form.Label>Success Story</Form.Label>
            </h3>
            <Form.Control
              required
              maxLength={255}
              as="textarea"
              rows={3}
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Text className="text-muted">
            {remainingCharacters} characters remaining
          </Form.Text>
        </Row>

        <br />
        <br />
        <Button variant="success" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default SuccessStories;
