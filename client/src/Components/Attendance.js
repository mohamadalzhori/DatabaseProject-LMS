import React, { useState, useEffect } from 'react'
import { Container, Row, Col, ListGroup, Form } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import axios from 'axios';

function Attendence() {
  // const [students, setStudents] = useState([]);
  const [attendance, setattendance] = useState([]);

  useEffect(()=>{
    fetchStudents();
  },[]);

  const fetchStudents = async ()=>{
    try{
      const response = await fetch('http://localhost:3001/authstudents'); 
      const data = await response.json();
      // setStudents(data);

      const updatedAttendance = data.map(student => {
        return { id: student.id, username: student.username, status: true };
      });
      setattendance(updatedAttendance);

    }catch (error){
        console.log("Error retrieving students data: ", error);
    }
  }



  console.log(attendance);
  // console.log(students);

  const handleCheckboxChange = (event, studentId) => {
    const isChecked = event.target.checked;
    setattendance(prevAttendance => {
      const updatedAttendance = prevAttendance.map(student => {
        if (student.id === studentId) {
          return { ...student, status: isChecked };
        }
        return student;
      });
      return updatedAttendance;
    });
  };



  const handleSubmit = (event) => {
    event.preventDefault();
  
    attendance.forEach((student) => {
      const data = {
        username: student.username,
        status: student.status
      };
  
      axios.post('http://localhost:3001/attendance', data)
        .then((response) => {
          if (response.data.error) {
            alert(response.data.error);
          } else {
            alert("Success");
          }
        })
        .catch((error) => {
          console.log("Error submitting attendance:", error);
          alert("Error submitting attendance");
        });
    });
  };
  


  
  return (
    <div>
        <h1>Attendance</h1>
    
        <form onSubmit={handleSubmit}>
      <ListGroup>
        {attendance.map(student => (
          <ListGroup.Item key={student.id}>
            <input
              type="checkbox"
              checked={student.status}
              onChange={event => handleCheckboxChange(event, student.id)}
            />
            {student.username}
          </ListGroup.Item>
        ))}
      </ListGroup>
      <button type="submit">Submit</button>
      </form>

    </div>
  )
}

export default Attendence