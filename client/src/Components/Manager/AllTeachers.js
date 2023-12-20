import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import axios from "axios";
function AllTeachers() {
  const [fetchedTeachers, setFetchedTeachers] = useState([]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phoneNb, setPhoneNb] = useState("");

  const [refresh, setRefresh] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/teacher/get/allinfo")
      .then((response) => {
        // Assuming response.data contains the Teachers
        setFetchedTeachers(response.data); // Store the Teachers in state
      })
      .catch((error) => {
        if (error.response) {
          alert(error.response.data.error);
        }
        console.error("Error fetching all teachers", error);
      });
  }, [refresh]); // Make sure 'refresh' is listed as a dependency

  useEffect(() => {
    console.log("fetched Teachers:", fetchedTeachers);
  }, [fetchedTeachers]); // Log whenever fetchedTeachers changes

  const handleDeleteTeacher = (teacher_id) => {
    console.log("bin clicked");
    axios
      .delete(`http://localhost:8080/teacher/delete/${teacher_id}`)
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          alert("Teacher Deleted Successfully");
          setRefresh(Date.now());
        }
      })
      .catch((error) => {
        if (error.response) {
          alert(error.response.data.error);
        }
        console.error(error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const username = `${firstname.slice(0, 3)}${lastname.slice(
      0,
      3
    )}${phoneNb.slice(-3)}`;

    const formData = {
      username,
      password,
      firstname,
      lastname,
      phoneNb,
    };
    console.log("Form data:", formData);

    axios
      .post("http://localhost:8080/teacher/addTeacher", formData)
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          alert("Teacher Added Successfully");
          setRefresh(Date.now());
        }
      })
      .catch((error) => {
        if (error.response) {
          alert(error.response.data.error);
        }
        // Handle error
        console.error(error);
      });

    // Reset the form after submission
    setUsername("");
    setPassword("");
    setFirstname("");
    setLastname("");
    setPhoneNb("");
  };

  const [teacherAssignments, setTeacherAssignments] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/teacherAssignment/")
      .then((response) => {
        // Assuming response.data contains the Teachers
        setTeacherAssignments(response.data); // Store the Teachers in state
      })
      .catch((error) => {
        if (error.response) {
          alert(error.response.data.error);
        }
        console.error("Error fetching all teachers", error);
      });
  }, [refresh]); // Make sure 'refresh' is listed as a dependency

  const handleDeleteTeacherAssignment = (assignment) => {
    const assign_teacher_id = assignment.teacher_id;
    const assign_grade_id = assignment.grade_id;
    const assign_subject_id = assignment.subject_id;
    axios
      .delete(
        `http://localhost:8080/teacherAssignment/delete/${assign_teacher_id}/${assign_grade_id}/${assign_subject_id}`
      )
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          alert("Teacher Deleted Successfully");
          setRefresh(Date.now());
        }
      })
      .catch((error) => {
        if (error.response) {
          alert(error.response.data.error);
        }
        console.error(error);
      });
  };

  const subjectNames = {
    1: "Arabic",
    2: "English",
    3: "Math",
    4: "Sciences",
    5: "Culture",
  };
  // Function to convert grade_ids to names
  const convertSubjectIdsToNames = (subject_ids) => {
    if (!subject_ids) return ""; // Handle empty values

    const idsArray = subject_ids.split(",").map(Number);
    const names = idsArray.map((id) => subjectNames[id]);
    return names.join(", ");
  };
  const subjectOptions = Object.entries(subjectNames);

  const [teacherIdAssign, setTeacherIdAssign] = useState("");
  const [gradeIdAssign, setGradeIdAssign] = useState("");
  const [subjectIdAssign, setSubjectIdAssign] = useState("");

  const handleSubmitAssignment = (event) => {
    event.preventDefault();
    // Make API call to add teacher assignment using teacherId, gradeId, subjectId
    axios
      .post("http://localhost:8080/teacherAssignment/add", {
        teacher_id: teacherIdAssign,
        grade_id: gradeIdAssign,
        subject_id: subjectIdAssign,
      })
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          alert("Teacher Assignment Added Successfully");

          setRefresh(Date.now());
        }

        // Handle success or redirection after adding the assignment
      })
      .catch((error) => {
        if (error.response) {
          alert(error.response.data.error);
        }
        console.error("Error adding teacher assignment", error);
        // Handle error
      });
  };

  return (
    <div className="w-75 mx-auto mt-3 ">
      <h2 className="mb-3">All Teachers</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Username</th>
            <th>Password</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone Number</th>
            <th>Grade IDs</th>
            <th>Subject IDs</th>
            <th className="text-center">Delete</th>
          </tr>
        </thead>
        <tbody>
          {fetchedTeachers.map((Teacher) => (
            <tr key={Teacher.id}>
              <td>{Teacher.username}</td>
              <td>{Teacher.password}</td>
              <td>{Teacher.firstname}</td>
              <td>{Teacher.lastname}</td>
              <td>{Teacher.phoneNb}</td>
              <td>{Teacher.grade_ids}</td>
              <td>{convertSubjectIdsToNames(Teacher.subject_ids)}</td>
              <td className="text-center">
                <Button
                  className="mt-0 me-0"
                  variant="outline-danger"
                  onClick={() => handleDeleteTeacher(Teacher.id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Add A Teacher </h3>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter FirstName"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </Col>
          <Col>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter lastName"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Col>

          <Col>
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              required
              type="number"
              placeholder="Enter Phone Number"
              value={phoneNb}
              onChange={(e) => setPhoneNb(e.target.value)}
            />
          </Col>
        </Row>

        <Button variant="success" type="submit">
          Submit
        </Button>
      </Form>
      <br />
      <h2>Teacher Assignments</h2>
      <table className="table table-bordered mt-3 mb-3">
        <thead>
          <tr>
            <th>Username</th>
            <th>Grade ID</th>
            <th>Subject ID</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {teacherAssignments.map((assignment, index) => (
            <tr key={index}>
              <td>{assignment.username}</td>
              <td>{assignment.grade_id}</td>
              <td>{subjectNames[assignment.subject_id]}</td>

              <td className="text-center">
                <Button
                  className="mt-0 me-0"
                  variant="outline-danger"
                  onClick={() => handleDeleteTeacherAssignment(assignment)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Add an Assignment </h3>
      <Form onSubmit={handleSubmitAssignment}>
        <Row className="mb-3">
          <Col>
            <Form.Group>
              <Form.Label>Teacher</Form.Label>
              <Form.Select
                required
                value={teacherIdAssign}
                onChange={(e) => setTeacherIdAssign(e.target.value)}
              >
                <option value="">Select Teacher</option>
                {fetchedTeachers.map((teacher) => (
                  <option key={teacher.id} value={teacher.id}>
                    {teacher.username}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Grade</Form.Label>
              <Form.Select
                required
                value={gradeIdAssign}
                onChange={(e) => setGradeIdAssign(e.target.value)}
              >
                <option value="">Select Grade</option>
                <option value="1">Grade 1</option>
                <option value="2">Grade 2</option>
                <option value="3">Grade 3</option>
                <option value="4">Grade 4</option>
                <option value="5">Grade 5</option>
                <option value="6">Grade 6</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Subject</Form.Label>
              <Form.Select
                required
                value={subjectIdAssign}
                onChange={(e) => setSubjectIdAssign(e.target.value)}
              >
                <option value="">Select Subject</option>
                {subjectOptions.map(([id, name]) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Button variant="success" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default AllTeachers;
