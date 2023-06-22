import React from 'react'
import Button from 'react-bootstrap/Button';
import axios from "axios";
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
function SuccessStories() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [story, setStory] = useState('');
  
  useEffect(()=>{
    fetchStudents();
  },[]);

  const fetchStudents = async ()=>{
    try{
      const response = await fetch('http://localhost:3001/successstories'); 
      const data = await response.json();
      setStudents(data);
    }catch (error){
        console.log("Error retrieving students data: ", error);
    }
  }

  const handleSubmit = (event) => {
    // In browsers the defaul submit reloads the page but we don't want this, we want to navigate to a certain page so we disable the default submit behaviour
    event.preventDefault();

    const data = {
      username:selectedStudent,
    };

    axios.post(`http://localhost:3001/authStudents`, data)
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        }else{
            alert("Modifications Submitted Successfully");

            setSelectedStudent('');
            fetchStudents();
      
        }
      });
  };


  return (
    <div>
      <Form onSubmit={handleSubmit}>

        <Form.Label>Student</Form.Label>
          <Form.Select aria-label="Default select example" value={selectedStudent} onChange={(e)=>{setSelectedStudent(e.target.value)}}>
            <option>Select a Student</option>
              {students.map((student)=>(
              <option key={student.id} >{student.username}</option>
            ))}

          </Form.Select> 
                <br />
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Success Story</Form.Label>
            <Form.Control as="textarea" rows={3} />
          </Form.Group>

      </Form>
                                    

    </div>
  )
}

export default SuccessStories