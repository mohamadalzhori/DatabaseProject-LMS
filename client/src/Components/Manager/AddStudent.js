import React, { useState } from "react";
import axios from "axios";

function AddStudent() {
  const [formData, setFormData] = useState({
    userName: "",
    firstName: "",
    phoneNumber: "",
    password: "",
    lastName: "",
    gradeId: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "HEY_ZHOURI_YOUR_API_ENDPOINT",
        formData
      );
      console.log("Student added successfully!", response.data);
      // Additional logic after successful form submission
    } catch (error) {
      console.error("Error submitting form:", error);
      console.log(formData);
      // Handle error state or display error message
      alert("Could not add the student");
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="container">
        <div className="  justify-content-center align-items-center">
          <div className="form ">
            <h4 className="mt-4 text-center mb-4">
              New Admission of Student In School
            </h4>
            <div className="form-content">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="User Name"
                      required
                      name="userName"
                      value={formData.userName}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="First Name"
                      required
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Phone Number"
                      required
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group mb-3">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      required
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Last Name"
                      required
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group mb-3">
                    <select
                      className="form-control"
                      required
                      name="gradeId"
                      value={formData.gradeId}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Grade</option>
                      <option value="1">Grade 1</option>
                      <option value="2">Grade 2</option>
                      <option value="3">Grade 3</option>
                      <option value="4">Grade 4</option>
                      <option value="5">Grade 5</option>
                      <option value="6">Grade 6</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <button type="submit" className="primary-btn  ">
                  Add Student
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default AddStudent;
