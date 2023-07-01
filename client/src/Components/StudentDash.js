import React, { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Button from "react-bootstrap/Button";

function StudentDash() {
  const [selectedSubjectLessons, setselectedSubjectLessons] = useState("1"); // this tells which subject is active in order to fetch the corresponding lessons
  const [selectedSubjectHW, setselectedSubjectHW] = useState("1"); // this tells which subject is active in order to fetch the corresponding Homeworks
  const [selectedSubjectMarks, setselectedSubjectMarks] = useState("1"); // this tells which subject is active in order to fetch the corresponding Marks
  const [lessons, setLessons] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [HW, setHW] = useState([]);
  const [marks, setMarks] = useState([]);
  const [activeSection, setActiveSection] = useState("homeworks");
  // Function to handle section change
  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  // when subject is changed, we fetch the lessons
  useEffect(() => {
    fetchLessons();
  }, [selectedSubjectLessons]);

  // when lessons changed, we fetch new documents
  useEffect(() => {
    fetchDocuments();
  }, [lessons]);

  // When the subjects tabs in the Homework section is selected
  useEffect(() => {
    fetchHW();
  }, [selectedSubjectHW]);

  // When the subjects tabs in the Marks section is selected
  useEffect(() => {
    fetchMarks();
  }, [selectedSubjectMarks]);

  // these two methods fetch the lessons and documents based on grade, later on we filter the lessons based on the subject and the documents based on the lessons and the subjects
  const fetchLessons = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/lessons/${sessionStorage.getItem("grade")}`
      );
      const data = await response.json();
      setLessons(data);
    } catch (error) {
      console.log("Error fetching lessons:", error);
    }
  };

  const fetchDocuments = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/documents/${sessionStorage.getItem("grade")}`
      );
      const data = await response.json();
      setDocuments(data);
    } catch (error) {
      console.log("Error fetching documents:", error);
    }
  };

  const fetchHW = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/homeworks/${sessionStorage.getItem("grade")}`
      );
      const data = await response.json();
      setHW(data);
    } catch (error) {
      console.log("Error fetching documents:", error);
    }
  };

  const fetchMarks = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/marks/${sessionStorage.getItem("grade")}`
      );
      const data = await response.json();
      setMarks(data);
    } catch (error) {
      console.log("Error fetching documents:", error);
    }
  };

  // updates a variable to be used later in the filter of lessons based on the subject
  const handleTabSelectLessons = (subject) => {
    setselectedSubjectLessons(subject);
  };

  const handleTabSelectHW = (subject) => {
    setselectedSubjectHW(subject);
  };

  const handleTabSelectMarks = (subject) => {
    setselectedSubjectMarks(subject);
  };

  // create a new array of lessons that are only related to the active subject
  const filteredLessons = lessons.filter(
    (lesson) => lesson.subject_id == selectedSubjectLessons
  );
  const filteredHW = HW.filter((hw) => hw.subject_id == selectedSubjectHW);
  const filteredMarks = marks.filter(
    (mark) => mark.subject_id == selectedSubjectMarks
  );

  // console.log(lessons);

  return (
    <div>
      <h1>Hello, {sessionStorage.getItem("username")}</h1>
      <Button
        variant="outline-primary"
        onClick={() => handleSectionChange("homeworks")}
      >
        Lessons & Homeworks
      </Button>{" "}
      <Button
        variant="outline-success"
        onClick={() => handleSectionChange("marks")}
      >
        Marks
      </Button>{" "}
      <br />
      <br />
      {activeSection === "homeworks" ? (
        <div>
          <h1>Lessons</h1>

          {/* through this line we can update our selectedSubjectLessons variable everytime a tab is changed */}
          <Tabs
            id="fill-tab-example"
            className="mb-3"
            fill
            activeKey={selectedSubjectLessons}
            onSelect={handleTabSelectLessons}
          >
            <Tab eventKey="1" title="Arabic">
              <Accordion>
                {/* Being here means that we already have a filteredLesson array that only has lesson related to the subject of this tab, we just map over it to print them all */}
                {filteredLessons.map((lesson, index) => {
                  // now in each lesson we are going to created a filtered array of documents that's related to this lesson then map over it to print them all
                  const lessonDocuments = documents.filter(
                    (document) => document.lesson_id === lesson.id
                  );
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

              {/* The same goes for the rest of the subjects  */}
            </Tab>
            <Tab eventKey="2" title="English">
              <Accordion>
                {filteredLessons.map((lesson, index) => {
                  const lessonDocuments = documents.filter(
                    (document) => document.lesson_id === lesson.id
                  );
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
                  const lessonDocuments = documents.filter(
                    (document) => document.lesson_id === lesson.id
                  );
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
                  const lessonDocuments = documents.filter(
                    (document) => document.lesson_id === lesson.id
                  );
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
                  const lessonDocuments = documents.filter(
                    (document) => document.lesson_id === lesson.id
                  );
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

          <br />
          <br />
          <br />
          <hr />
          <h1>Homeworks</h1>

          {/* through this line we can update our selectedSubjectHW variable everytime a tab is changed */}
          <Tabs
            id="fill-tab-example"
            className="mb-3"
            fill
            activeKey={selectedSubjectHW}
            onSelect={handleTabSelectHW}
          >
            <Tab eventKey="1" title="Arabic">
              <Accordion>
                {/* Being here means that we already have a filteredHW array that's related to the subject of this tab, we just map over it to print them all */}
                {filteredHW.map((hw, index) => {
                  return (
                    <Accordion.Item key={hw.id} eventKey={index.toString()}>
                      <Accordion.Header>{hw.homework_name}</Accordion.Header>
                      <Accordion.Body>
                        <p>{hw.homework_body}</p>
                      </Accordion.Body>
                    </Accordion.Item>
                  );
                })}
              </Accordion>

              {/* The same goes for the rest of the subjects  */}
            </Tab>
            <Tab eventKey="2" title="English">
              <Accordion>
                {/* Being here means that we already have a filteredHW array that's related to the subject of this tab, we just map over it to print them all */}
                {filteredHW.map((hw, index) => {
                  return (
                    <Accordion.Item key={hw.id} eventKey={index.toString()}>
                      <Accordion.Header>{hw.homework_name}</Accordion.Header>
                      <Accordion.Body>
                        <p>{hw.homework_body}</p>
                      </Accordion.Body>
                    </Accordion.Item>
                  );
                })}
              </Accordion>

              {/* The same goes for the rest of the subjects  */}
            </Tab>
            <Tab eventKey="3" title="Math">
              <Accordion>
                {/* Being here means that we already have a filteredHW array that's related to the subject of this tab, we just map over it to print them all */}
                {filteredHW.map((hw, index) => {
                  return (
                    <Accordion.Item key={hw.id} eventKey={index.toString()}>
                      <Accordion.Header>{hw.homework_name}</Accordion.Header>
                      <Accordion.Body>
                        <p>{hw.homework_body}</p>
                      </Accordion.Body>
                    </Accordion.Item>
                  );
                })}
              </Accordion>

              {/* The same goes for the rest of the subjects  */}
            </Tab>
            <Tab eventKey="4" title="Sciences">
              <Accordion>
                {/* Being here means that we already have a filteredHW array that's related to the subject of this tab, we just map over it to print them all */}
                {filteredHW.map((hw, index) => {
                  return (
                    <Accordion.Item key={hw.id} eventKey={index.toString()}>
                      <Accordion.Header>{hw.homework_name}</Accordion.Header>
                      <Accordion.Body>
                        <p>{hw.homework_body}</p>
                      </Accordion.Body>
                    </Accordion.Item>
                  );
                })}
              </Accordion>

              {/* The same goes for the rest of the subjects  */}
            </Tab>
            <Tab eventKey="5" title="Islamic Culture">
              <Accordion>
                {/* Being here means that we already have a filteredHW array that's related to the subject of this tab, we just map over it to print them all */}
                {filteredHW.map((hw, index) => {
                  return (
                    <Accordion.Item key={hw.id} eventKey={index.toString()}>
                      <Accordion.Header>{hw.homework_name}</Accordion.Header>
                      <Accordion.Body>
                        <p>{hw.homework_body}</p>
                      </Accordion.Body>
                    </Accordion.Item>
                  );
                })}
              </Accordion>

              {/* The same goes for the rest of the subjects  */}
            </Tab>
          </Tabs>
        </div>
      ) : (
        <div>
          {/* Marks content */}
          <h1>Marks</h1>

          {/* through this line we can update our selectedSubjectHW variable everytime a tab is changed */}
          <Tabs
            id="fill-tab-example"
            className="mb-3"
            fill
            activeKey={selectedSubjectMarks}
            onSelect={handleTabSelectMarks}
          >
            <Tab eventKey="1" title="Arabic">
              <Accordion>
                {/* Being here means that we already have a filteredHW array that's related to the subject of this tab, we just map over it to print them all */}
                {filteredMarks.map((mark, index) => {
                  return (
                    <Accordion.Item key={mark.id} eventKey={index.toString()}>
                      <Accordion.Header>{mark.mark_name}</Accordion.Header>
                      <Accordion.Body>
                        <p>{mark.mark_value}</p>
                      </Accordion.Body>
                    </Accordion.Item>
                  );
                })}
              </Accordion>

              {/* The same goes for the rest of the subjects  */}
            </Tab>
            <Tab eventKey="2" title="English">
              <Accordion>
                {/* Being here means that we already have a filteredHW array that's related to the subject of this tab, we just map over it to print them all */}
                {filteredMarks.map((mark, index) => {
                  return (
                    <Accordion.Item key={mark.id} eventKey={index.toString()}>
                      <Accordion.Header>{mark.mark_name}</Accordion.Header>
                      <Accordion.Body>
                        <p>{mark.mark_value}</p>
                      </Accordion.Body>
                    </Accordion.Item>
                  );
                })}
              </Accordion>

              {/* The same goes for the rest of the subjects  */}
            </Tab>
            <Tab eventKey="3" title="Math">
              <Accordion>
                {/* Being here means that we already have a filteredHW array that's related to the subject of this tab, we just map over it to print them all */}
                {filteredMarks.map((mark, index) => {
                  return (
                    <Accordion.Item key={mark.id} eventKey={index.toString()}>
                      <Accordion.Header>{mark.mark_name}</Accordion.Header>
                      <Accordion.Body>
                        <p>{mark.mark_value}</p>
                      </Accordion.Body>
                    </Accordion.Item>
                  );
                })}
              </Accordion>

              {/* The same goes for the rest of the subjects  */}
            </Tab>
            <Tab eventKey="4" title="Sciences">
              <Accordion>
                {/* Being here means that we already have a filteredHW array that's related to the subject of this tab, we just map over it to print them all */}
                {filteredMarks.map((mark, index) => {
                  return (
                    <Accordion.Item key={mark.id} eventKey={index.toString()}>
                      <Accordion.Header>{mark.mark_name}</Accordion.Header>
                      <Accordion.Body>
                        <p>{mark.mark_value}</p>
                      </Accordion.Body>
                    </Accordion.Item>
                  );
                })}
              </Accordion>

              {/* The same goes for the rest of the subjects  */}
            </Tab>
            <Tab eventKey="5" title="Islamic Culture">
              <Accordion>
                {/* Being here means that we already have a filteredHW array that's related to the subject of this tab, we just map over it to print them all */}
                {filteredMarks.map((mark, index) => {
                  return (
                    <Accordion.Item key={mark.id} eventKey={index.toString()}>
                      <Accordion.Header>{mark.mark_name}</Accordion.Header>
                      <Accordion.Body>
                        <p>{mark.mark_value}</p>
                      </Accordion.Body>
                    </Accordion.Item>
                  );
                })}
              </Accordion>

              {/* The same goes for the rest of the subjects  */}
            </Tab>
          </Tabs>
          {/* Add your marks components here */}
        </div>
      )}
    </div>
  );
}

export default StudentDash;
