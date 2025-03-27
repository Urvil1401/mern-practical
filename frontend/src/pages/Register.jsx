import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    birthdate: "",
    phone: "",
    profilePicture: null,
  });

  const navigate = useNavigate();

  const [errors, setErrors] = useState({ password: "", phone: "" });

const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });

  if (e.target.name === "password") {
    setErrors((prev) => ({
      ...prev,
      password: e.target.value.length >= 6 ? "" : "Password must be at least 6 characters.",
    }));
  }
  if (e.target.name === "phone") {
    setErrors((prev) => ({
      ...prev,
      phone: /^[0-9]{10}$/.test(e.target.value) ? "" : "Phone number must be 10 digits.",
    }));
  }
};

  const handleFileChange = (e) => {
    setFormData({ ...formData, profilePicture: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (errors.password || errors.phone) {
      alert("Please fix validation errors before submitting.");
      return;
    }
    
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert(res.data.message);
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formBox}>
        <h2 style={styles.heading}>Register</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data" style={styles.form}>
          <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} required style={styles.input} />
          <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} required style={styles.input} />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required style={styles.input} />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required style={styles.input} />
          {errors.password && <p style={{ color: "red", fontSize: "12px" }}>{errors.password}</p>}
          <input type="date" name="birthdate" onChange={handleChange} required style={styles.input} />
          <input type="text" name="phone" placeholder="Phone" onChange={handleChange} required style={styles.input} />
          {errors.phone && <p style={{ color: "red", fontSize: "12px" }}>{errors.phone}</p>}
          <input type="file" name="profilePicture" onChange={handleFileChange} required style={styles.fileInput} />
          <button type="submit" style={styles.button}>Register</button>
        </form>
        <p style={styles.text}>
          Already have an account? <span style={styles.link} onClick={() => navigate("/")}>Login</span>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f4f4f4",
  },
  formBox: {
    width: "600px",
    padding: "20px",
    background: "#fff",
    borderRadius: "8px",
    boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  heading: {
    marginBottom: "20px",
    fontSize: "24px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    width: "98%",
    padding: "10px",
    margin: "8px 0",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "16px",
  },
  fileInput: {
    margin: "10px 0",
  },
  button: {
    width: "100%",
    padding: "10px",
    background: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "10px",
  },
  text: {
    marginTop: "10px",
    fontSize: "14px",
  },
  link: {
    color: "#007bff",
    cursor: "pointer",
  },
};

export default Register;