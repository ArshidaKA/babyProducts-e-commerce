import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './SignUp.css'; // Optional, if you want custom CSS styling as well

function SignUP() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Validation Schema
  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required").min(3, "Username must be at least 3 characters"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
  });

  // Handle form submission
  const handleSubmit = (values) => {
    console.log("Form submitted:", values);
    setLoading(true);
    axios
      .post("http://localhost:4000/users", {
        username: values.username,
        email: values.email,
        password: values.password,
        cart:[],
        order:[]
      })
      .then((res) => {
        console.log(res.data);
        navigate("/login"); // Redirect to login after successful signup
      })
      .catch((error) => {
        console.log(error);
        alert("Sign up failed. Please try again.");
      });
  };

  return (
    <div className="container mt-5">
      <div className="col-md-6 mx-auto">
        <div className="text-center mb-4">
          <h2 style={{ color: '#b35ea0' }}>Sign Up</h2>
        </div>
        <div className="card shadow-lg p-4">
          <Formik
            initialValues={{
              username: "",
              email: "",
              password: ""
             
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ touched, errors }) => (
              <Form>
                {/* Username Field */}
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Username</label>
                  <Field
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Enter your username"
                    className={`form-control ${touched.username && errors.username ? 'is-invalid' : ''}`}
                  />
                  <ErrorMessage name="username" component="div" className="invalid-feedback" />
                </div>

                {/* Email Field */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    className={`form-control ${touched.email && errors.email ? 'is-invalid' : ''}`}
                  />
                  <ErrorMessage name="email" component="div" className="invalid-feedback" />
                </div>

                {/* Password Field */}
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    className={`form-control ${touched.password && errors.password ? 'is-invalid' : ''}`}
                  />
                  <ErrorMessage name="password" component="div" className="invalid-feedback" />
                </div>

                {/* Submit Button */}
                <div className="d-grid gap-2">
                  <button
                    className="btn btn-primary"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Signing up..." : "Sign Up"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>

        {/* Link to Login page */}
        <div className="mt-3 text-center">
          <p>
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUP;
