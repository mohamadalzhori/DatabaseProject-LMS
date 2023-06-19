import React, { useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Card, Button } from 'react-bootstrap';

function StudentDash() {
  const [username, setUsername] = useState('');
  const [grade, setGrade] = useState('');
  const [lessons, setLessons] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [documents, setDocuments] = useState([]);


  useEffect(() => {
    const username = sessionStorage.getItem('username');
    setUsername(username);
  }, []);

  useEffect(() => {
    fetchDocuments();
  }, [selectedSubject, lessons]);

  useEffect(() => {
    const grade = sessionStorage.getItem('grade');
    setGrade(grade);
    setSelectedSubject(1); // Set the default active key initially
  }, []);

  useEffect(() => {
    // Fetch lessons data from API
    fetchLessons();
  }, []);

  const fetchLessons = async () => {
    try {
      const response = await fetch(`http://localhost:3001/lessons/${grade}`);
      const data = await response.json();
      setLessons(data);
      // console.log(d  ata);
    } catch (error) {
      console.log('Error fetching lessons:', error);
    }
  };

  const fetchDocuments = async () => {
    try {
      const response = await fetch(`http://localhost:3001/documents/${grade}`);
      const data = await response.json();
      setDocuments(data);
      // console.log(data);
    } catch (error) {
      console.log('Error fetching documents:', error);
    }
  };

  const handleTabSelect = (subject) => {
    setSelectedSubject(subject);
  };

  const filteredLessons = lessons.filter((lesson) => lesson.subject_id == selectedSubject);
  // console.log(grade);

  // console.log(filteredLessons);
  // console.log(selectedSubject);

  return (
    <div>
      <h1>Hello, {username}</h1>
      <h1>Subjects</h1>

      <Tabs id="fill-tab-example" className="mb-3" fill activeKey={selectedSubject} onSelect={handleTabSelect}>
        <Tab eventKey="1" title="Arabic">
          <Accordion>
            {filteredLessons.map((lesson, index) => {
                const lessonDocuments = documents.filter((document) => document.lesson_id === lesson.id);
                return (
                  <Accordion.Item key={index} eventKey={index.toString()}>
                    <Accordion.Header>{lesson.lesson_name}</Accordion.Header>
                    <Accordion.Body>
                      {lessonDocuments.map((document) => (
                        <div key={document.id}>
                          <p>Document Name: {document.document_name}</p>
                          <p>Document URL: {document.document_link}</p>
                        </div>
                      ))}
                    </Accordion.Body>
                  </Accordion.Item>
                );
              })}
          </Accordion>
        </Tab>
        <Tab eventKey="2" title="English">
          <Accordion>
            {filteredLessons.map((lesson, index) => {
                const lessonDocuments = documents.filter((document) => document.lesson_id === lesson.id);
                return (
                  <Accordion.Item key={index} eventKey={index.toString()}>
                    <Accordion.Header>{lesson.lesson_name}</Accordion.Header>
                    <Accordion.Body>
                      {lessonDocuments.map((document) => (
                        <div key={document.id}>
                          <p>Document Name: {document.document_name}</p>
                          <p>Document URL: {document.document_link}</p>
                        </div>
                      ))}
                    </Accordion.Body>
                  </Accordion.Item>
                );
              })}
          </Accordion>
        </Tab>
        <Tab eventKey="3" title="Math">
          <Accordion>
            {filteredLessons.map((lesson, index) => {
                const lessonDocuments = documents.filter((document) => document.lesson_id === lesson.id);
                return (
                  <Accordion.Item key={index} eventKey={index.toString()}>
                    <Accordion.Header>{lesson.lesson_name}</Accordion.Header>
                    <Accordion.Body>
                      {lessonDocuments.map((document) => (
                        <div key={document.id}>
                          <p>Document Name: {document.document_name}</p>
                          <p>Document URL: {document.document_link}</p>
                        </div>
                      ))}
                    </Accordion.Body>
                  </Accordion.Item>
                );
              })}
          </Accordion>
        </Tab>
        <Tab eventKey="4" title="Sciences">
          <Accordion>
            {filteredLessons.map((lesson, index) => {
                const lessonDocuments = documents.filter((document) => document.lesson_id === lesson.id);
                return (
                  <Accordion.Item key={index} eventKey={index.toString()}>
                    <Accordion.Header>{lesson.lesson_name}</Accordion.Header>
                    <Accordion.Body>
                      {lessonDocuments.map((document) => (
                        <div key={document.id}>
                          <p>Document Name: {document.document_name}</p>
                          <p>Document URL: {document.document_link}</p>
                        </div>
                      ))}
                    </Accordion.Body>
                  </Accordion.Item>
                );
              })}
          </Accordion>
        </Tab>
        <Tab eventKey="5" title="Islamic Culture">
          <Accordion>
            {filteredLessons.map((lesson, index) => {
                const lessonDocuments = documents.filter((document) => document.lesson_id === lesson.id);
                return (
                  <Accordion.Item key={index} eventKey={index.toString()}>
                    <Accordion.Header>{lesson.lesson_name}</Accordion.Header>
                    <Accordion.Body>
                      {lessonDocuments.map((document) => (
                        <div key={document.id}>
                          <p>Document Name: {document.document_name}</p>
                          <p>Document URL: {document.document_link}</p>
                        </div>
                      ))}
                    </Accordion.Body>
                  </Accordion.Item>
                );
              })}
          </Accordion>
        </Tab>

        

      </Tabs>


    </div>
  );
}

export default StudentDash;
