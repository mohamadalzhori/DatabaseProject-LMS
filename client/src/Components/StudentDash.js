import React, { useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Card, Button } from 'react-bootstrap';

function StudentDash() {
  const [selectedSubject, setSelectedSubject] = useState('1');// this tells which subject is active in order to fetch the corresponding lessons
  const [lessons, setLessons] = useState([]);
  const [documents, setDocuments] = useState([]);


  // when subject is change, we fetch the lessons
  useEffect(() => {
    fetchLessons();
  }, [selectedSubject]);
  
  // when lessons change, we fetch new documents
  useEffect(() => {
    fetchDocuments();
  }, [lessons]);

  
// these two methods fethc the lessons and documents based on grade, later on we filter the lessons based on the subject and the documents based on the lessons and the subjects
  const fetchLessons = async () => {
    try {
      const response = await fetch(`http://localhost:3001/lessons/${sessionStorage.getItem('grade')}`);
      const data = await response.json();
      setLessons(data);
    } catch (error) {
      console.log('Error fetching lessons:', error);
    }
  };

  const fetchDocuments = async () => {
    try {
      const response = await fetch(`http://localhost:3001/documents/${sessionStorage.getItem('grade')}`);
      const data = await response.json();
      setDocuments(data);
    } catch (error) {
      console.log('Error fetching documents:', error);
    }
  };


  // updates a variable to be used later in the filter of lessons based on the subject
  const handleTabSelect = (subject) => {
    setSelectedSubject(subject);
  };

  // create a new array of lessons that are only related to the active subject
  const filteredLessons = lessons.filter((lesson) => lesson.subject_id == selectedSubject);
  

  return (
    <div>
      <h1>Hello, {sessionStorage.getItem('username')}</h1>
      <h1>Subjects</h1>

      // through this line we can update our selectedSubject variable everytime a tab is changed
      <Tabs id="fill-tab-example" className="mb-3" fill activeKey={selectedSubject} onSelect={handleTabSelect}>


        <Tab eventKey="1" title="Arabic">
          <Accordion>

            // Being here means that we already have a filteredLesson array that only has lesson related to the subject of this tab, we just map over it to print them all
            {filteredLessons.map((lesson, index) => {
                // now in each lesson we are going to created a filtered array of documents that's related to this lesson then map over it to print them all
                const lessonDocuments = documents.filter((document) => document.lesson_id === lesson.id);
                return (
                  <Accordion.Item key={lesson.id} eventKey={index.toString()}>
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

          // The same goes for the rest of the subjects 

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
