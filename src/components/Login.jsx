import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const initialValues = {
    email: "",
    password: "",
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const onSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      // Fetch user data from the server based on email and password
      const response = await axios.get("http://localhost:4000/users", {
        params: {
          email: values.email,
          password: values.password,
        },
      });

      if (response.data.length > 0) {
        const user = response.data[0]; // Get the first matched user
        if (user.blocked) {
          // Check if the user is blocked
          setStatus({
            message: "Your account has been blocked. Please contact support.",
          });
        } else {
          // User is not blocked, proceed with login
          console.log("Login Success:", user.id);
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("id", user.id);
          setIsLoggedIn(true);

          // Navigate based on user role
          if (user.role === "admin") {
            navigate("/adminlayout");
          } else {
            navigate("/");
          }
        }
      } else {
        setStatus({ message: "Invalid credentials" }); // No matching user found
      }
    } catch (error) {
      console.error("Login Error:", error);
      setStatus({ message: "Error occurred. Please try again later." });
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("id");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <div className="containers container mt-4">
      <div className="col-md-6 mx-auto">
        <div className="text-center mb-3">
          <h2 style={{ color: "#2e1c21", marginLeft: -50 }}>
            Bab<span style={{ color: "yellow" }}>Y</span>bliss
          </h2>
        </div>
        <div className="box card shadow-lg p-4">
          <h4 className="text-center mb-4" style={{ color: "#2e1c21" }}>
            Welcome Back!
          </h4>
          {isLoggedIn ? (
            <div className="text-center">
              <button
                className="btn btn-danger w-100 mt-3 py-2"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({ isSubmitting, status }) => (
                <Form>
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
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-danger"
                    />
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
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  {status && status.message && (
                    <div className="alert alert-danger">{status.message}</div>
                  )}

                  <button
                    type="submit"
                    className="btn btn-primary w-100 mt-3 py-2"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Logging In..." : "Login"}
                  </button>
                </Form>
              )}
            </Formik>
          )}

          {!isLoggedIn && (
            <div className="text-center mt-3">
              <h6>
                Don't have an account?{" "}
                <button
                  className="btn btn-link"
                  onClick={() => navigate("/signUP")}
                  style={{ color: "blue", textDecoration: "underline" }}
                >
                  Sign Up
                </button>
              </h6>
            </div>
          )}
        </div>
      </div>
      <h6 className="text-center mt-4 text-muted">
        By continuing, I agree to the{" "}
        <a href="#" style={{ color: "blue" }}>
          Terms of Use
        </a>{" "}
        and{" "}
        <a href="#" style={{ color: "blue" }}>
          Privacy Policy
        </a>
      </h6>
    </div>
  );
};

export default Login;
