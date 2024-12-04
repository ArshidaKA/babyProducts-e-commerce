import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUP() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Form validation schema
  const validationSchema = Yup.object({
    username: Yup.string()
      .required("Username is required")
      .min(3, "Username must be at least 3 characters"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    setLoading(true);
    try {
      // Check if email already exists
      const existingUsers = await axios.get("http://localhost:4000/users", {
        params: { email: values.email },
      });

      if (existingUsers.data.length > 0) {
        setStatus({ message: "Email already exists. Please use a different one." });
      } else {
        // Proceed with user registration
        await axios.post("http://localhost:4000/users", {
          ...values,
          cart: [],
          order: [],
          blocked: false,
        });

        navigate("/login"); // Navigate to login after successful signup
      }
    } catch (error) {
      console.error("SignUp Error:", error);
      setStatus({ message: "An error occurred. Please try again later." });
    } finally {
      setSubmitting(false);
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="col-md-6 mx-auto">
        <div className="text-center mb-4">
          <h2>Sign Up</h2>
        </div>
        <div className="card shadow-lg p-4">
          <Formik
            initialValues={{ username: "", email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ status, isSubmitting }) => (
              <Form>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <Field
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Enter your username"
                    className="form-control"
                  />
                  <ErrorMessage name="username" component="div" className="text-danger" />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    className="form-control"
                  />
                  <ErrorMessage name="email" component="div" className="text-danger" />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    className="form-control"
                  />
                  <ErrorMessage name="password" component="div" className="text-danger" />
                </div>

                {status && status.message && (
                  <div className="alert alert-danger">{status.message}</div>
                )}

                <div className="d-grid">
                  <button
                    className="btn btn-primary"
                    type="submit"
                    disabled={isSubmitting || loading}
                  >
                    {loading ? "Signing up..." : "Sign Up"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>

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
