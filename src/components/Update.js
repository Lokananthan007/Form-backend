import React, { useState } from "react";
import axios from "axios";

function Update() {
  const [formData, setFormData] = useState({
    userId: "",
    name: "",
    mobile: "",
    email: "",
    dob: "",
    gender: "",
    city: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`/users/update/${formData.userId}`, formData);
      alert("User data updated successfully!");
    } catch (error) {
      console.error("Error updating user data:", error);
      alert("Error updating user data");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>User ID:</label>
        <input type="text" name="userId" onChange={handleChange} />

        <label>Name:</label>
        <input type="name" name="name" onChange={handleChange} />

        <label>Mobile:</label>
        <input type="number" name="mobile" onChange={handleChange} />

        <label>Email:</label>
        <input type="email" name="email" onChange={handleChange} />

        <label>DOB:</label>
        <input type="date" name="dob" onChange={handleChange} />

        <label>Gender:</label>
        <input type="text" name="gender" onChange={handleChange} />

        <label>City:</label>
        <input type="text" name="city" onChange={handleChange} />

        <button type="submit">Update User</button>
      </form>
    </div>
  );
}

export default Update;
