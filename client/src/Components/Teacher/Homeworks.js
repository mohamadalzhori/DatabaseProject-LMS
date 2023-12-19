import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Alert from "react-bootstrap/Alert";

function Homeworks(props) {
  const [subject_id, setSubjectId] = useState("");
  const { outsideMatchingSubject, grade_id } = props;
  const subjectNames = {
    1: "Arabic",
    2: "English",
    3: "Math",
    4: "Sciences",
    5: "Culture",
  };

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [correspondingHomeworks, setCorrespondingHomeworks] = useState([]);
  const [loadedHomeworks, setLoadedHomeworks] = useState([]);

  // Add another useEffect to fetch homeworks on component mount
  useEffect(() => {
    console.log("Fetching homeworks on mount...");
    const subjectIdsArray = outsideMatchingSubject.map(
      (item) => item.subject_id
    );
    console.log(
      "Subject IDs Array mount + grade id:",
      subjectIdsArray,
      grade_id
    );

    fetchHomeworks(subjectIdsArray);
  }, [outsideMatchingSubject]); // Empty dependency array to fetch on mount

  useEffect(() => {
    console.log("out match sub", outsideMatchingSubject);
    const subjectIdsArray = outsideMatchingSubject.map(
      (item) => item.subject_id
    );

    // Now subjectIdsArray contains the subject_ids that can be used in the SQL query
    console.log(
      "Subject IDs Array mon grade + grade id:",
      subjectIdsArray,
      grade_id
    );

    fetchHomeworks(subjectIdsArray);
  }, [grade_id]);

  const fetchHomeworks = (subjectIdsArray) => {
    axios
      .get(`http://localhost:8080/homework/${grade_id}`, {
        params: {
          subjectIds: subjectIdsArray.join(","),
        },
      })
      .then((response) => {
        // Handle the response
        console.log("Corresponding homeworks", response.data);
        setCorrespondingHomeworks(response.data);
      })
      .catch((error) => {
        // Handle errors
        console.error(error);
      });
  };

  useEffect(() => {
    // Set the fetched homeworks to the state variable
    setLoadedHomeworks(correspondingHomeworks);
  }, [correspondingHomeworks]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
      title,
      description,
      due_date: dueDate,
      subject_id,
      grade_id,
    };
    console.log("Form data:", formData);

    axios
      .post("http://localhost:8080/homework/add", formData)
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          alert("Homework Added Successfully");
          // Refetch the homeworks after adding a new homework

          fetchHomeworks(outsideMatchingSubject.map((item) => item.subject_id));
        }
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });

    // Reset the form after submission
    setTitle("");
    setDescription("");
    setDueDate("");
    setSubjectId("");
  };

  const handleDeleteHomework = (homeworkId) => {
    axios
      .delete(`http://localhost:8080/homework/${homeworkId}`)
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          alert("Homework Deleted Successfully");
          // Refetch the homeworks after deleting a homework
          fetchHomeworks(outsideMatchingSubject.map((item) => item.subject_id));
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <div>
        <h2>Homeworks</h2>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Grade</th>
              <th>Subject </th>
              <th>Title</th>
              <th>Description</th>
              <th>Due Date (mm/dd/yyyy)</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {loadedHomeworks
              .slice()
              .sort((a, b) => {
                if (a.grade_id !== b.grade_id) {
                  return a.grade_id - b.grade_id;
                } else if (a.subject_id !== b.subject_id) {
                  return a.subject_id - b.subject_id;
                } else {
                  return new Date(a.due_date) - new Date(b.due_date);
                }
              })
              .map((homework) => (
                <tr key={homework.id}>
                  <td>{homework.grade_id}</td>
                  <td>{subjectNames[homework.subject_id]}</td>
                  <td>{homework.title}</td>
                  <td>{homework.description}</td>
                  <td>{new Date(homework.due_date).toLocaleDateString()} </td>
                  <td className="text-center">
                    <Button
                      className="mt-0 me-0"
                      variant="outline-danger"
                      onClick={() => handleDeleteHomework(homework.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <h3>Add A Homework </h3>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col>
            <Form.Label>
              <b>Subject</b>
            </Form.Label>
            <Form.Select
              required
              aria-label="Default select example"
              value={subject_id}
              onChange={(e) => {
                setSubjectId(e.target.value);
              }}
            >
              <option value="">Select a Subject</option>
              {outsideMatchingSubject.map((subject, index) => (
                <option key={index} value={subject.subject_id}>
                  {subjectNames[subject.subject_id]}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col>
            <Form.Label>Title</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Col>
          <Col>
            <Form.Label>Due Date</Form.Label>
            <Form.Control
              required
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Label>Description</Form.Label>
            <Form.Control
              required
              as="textarea"
              rows={3}
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Col>
        </Row>
        <Button variant="success" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Homeworks;
