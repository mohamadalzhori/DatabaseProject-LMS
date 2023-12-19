import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import axios from "axios";
import { Form } from "react-bootstrap";

function Documents() {
  const lesson_id = localStorage.getItem("lesson_id");
  const lesson_name = localStorage.getItem("lesson_name");

  const [loadedDocuments, setLoadedDocuments] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [URL, setURL] = useState("");

  useEffect(() => {
    fetchDocuments();
  }, [loadedDocuments]); // Update when loadedDocuments changes

  const fetchDocuments = () => {
    axios
      .get(`http://localhost:8080/document/${lesson_id}`)
      .then((response) => {
        setLoadedDocuments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching documents:", error);
        // Handle errors
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
      title,
      description,
      URL,
      lesson_id,
    };
    console.log("Form data:", formData);

    axios
      .post("http://localhost:8080/document", formData)
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          alert("Document Added Successfully");
          // Fetch updated documents after successful submission
          axios
            .get(`http://localhost:8080/document/${lesson_id}`)
            .then((response) => {
              setLoadedDocuments(response.data);
            })
            .catch((error) => {
              console.error("Error fetching documents:", error);
              // Handle errors
            });

          // Reset the form after successful submission
          setTitle("");
          setDescription("");
          setURL("");
        }
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
  };

  const handleDeleteDocument = (documentId) => {
    axios
      .delete(`http://localhost:8080/document/${documentId}`)
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          alert("Document Deleted Successfully");
          fetchDocuments(); // Fetch updated documents after deletion
        }
      })
      .catch((error) => {
        console.error("Error deleting document:", error);
      });
  };

  return (
    <>
      <div id="heading">
        <h3>Documents of</h3>
        <h1>
          <b>{lesson_name}</b>
        </h1>
      </div>
      <br />
      <div className="w-75 mx-auto">
        <table className="table table-bordered ">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Url</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {loadedDocuments.map((Document) => (
              <tr key={Document.id}>
                <td>{Document.title}</td>
                <td>{Document.description}</td>
                <td>
                  <a href={Document.url} target="_blank">
                    {Document.url}
                  </a>
                </td>

                <td className="text-center">
                  <Button
                    className="mt-0 me-0"
                    variant="outline-danger"
                    onClick={() => handleDeleteDocument(Document.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <br />
        <h3>Add A Document for "{lesson_name}" </h3>

        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col>
              <Form.Label>
                <b>Title</b>
              </Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Col>
            <Col>
              <Form.Label>
                <b>Description</b>
              </Form.Label>
              <Form.Control
                required
                as="textarea"
                rows={3}
                placeholder="Enter Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Label>
                <b>URL</b>
              </Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter URL"
                value={URL}
                onChange={(e) => setURL(e.target.value)}
              />
            </Col>
          </Row>
          <Button variant="success" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
}

export default Documents;
