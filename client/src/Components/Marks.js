import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';

function Marks() {
    const [grade_id, setGrade] = useState('');
    const [subject_id, setSubject] = useState('');
    const [mark_name, setmarkName] = useState('');
    const [mark_value, setmarkValue] = useState('');

    const handleSubmit = (event) => {
        // In browsers the defaul submit reloads the page but we don't want this, we want to navigate to a certain page so we disable the default submit behaviour
        event.preventDefault();
    
        const data = {
            grade_id,
            subject_id,
            mark_name,
            mark_value
        };
    
        axios.post('http://localhost:3001/marks', data)
          .then((response) => {
            if (response.data.error) {
              alert(response.data.error);
            }else{
                alert("Mark Submitted Successfully");

                setGrade('');
                setSubject('');
                setmarkName('');
                setmarkValue('');
            }
          });
      };

  return (
    <div>
        <h3>Kindly fill out the following form to submit the marks: </h3>
        <br />
        <Form onSubmit={handleSubmit}>
            <Row>
                <Col>
                        <Form.Label>Grade</Form.Label>
                    <Form.Select aria-label="Default select example" value={grade_id} onChange={(e)=>{setGrade(e.target.value)}}>
                        <option>Select a Grade</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                    </Form.Select>
                </Col>
                <Col>
                        <Form.Label>Subject</Form.Label>    
                    <Form.Select aria-label="Default select example" value={subject_id} onChange={(e)=>{setSubject(e.target.value)}}>
                        <option value="">Select a Subject</option>
                        <option value="1">Arabic</option>
                        <option value="2">English</option>
                        <option value="3">Math</option>
                        <option value="4">Sciences</option>
                        <option value="5">Islamic Sciences</option>
                    </Form.Select>
                </Col>
            </Row>
            <br />
            <Row>
                <Col>
                        <Form.Group className="mb-3">
                    <Form.Label>Mark Name</Form.Label>
                    <Form.Control required placeholder="Enter the name of the mark" value={mark_name} onChange={(e)=>{setmarkName(e.target.value)}} />
                        </Form.Group>
                </Col>
                <Col>
                        <Form.Group className="mb-3">
                    <Form.Label>Mark Value</Form.Label>
                    <Form.Control required placeholder="Enter the value of the mark" value={mark_value} onChange={(e)=>{setmarkValue(e.target.value)}}/>
                        </Form.Group>
                </Col>
            </Row>
        
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
        

    </div>
  )
}

export default Marks