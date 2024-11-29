import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // State to track login status

  const initialValues = {
    email: '',
    password: ''
  };

  // Check if user is already logged in on component mount
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required')
  });

  const onSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      // Send GET request to JSON Server for login
      const response = await axios.get('http://localhost:4000/users', {
        params: {
          email: values.email,
          password: values.password
        }
      });

      // If a user is found, proceed with login
      if (response.data.length > 0) {
        console.log('Login Success:', response.data[0].id);
        localStorage.setItem('user', JSON.stringify(response.data[0]));
        localStorage.setItem('id', response.data[0].id);
        setIsLoggedIn(true);  // Set login state to true
        navigate('/'); // Redirect to the home page
      } else {
        setStatus({ message: 'Invalid credentials' });
      }
    } catch (error) {
      console.error('Login Error:', error);
      setStatus({ message: 'Error occurred. Please try again later.' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');  // Remove user data from localStorage
    localStorage.removeItem('id');    // Remove user id from localStorage
    setIsLoggedIn(false);  // Set login state to false
    navigate('/login');    // Redirect to login page
  };

  return (
    <div className="containers container mt-4">
      <div className="col-md-6 mx-auto">
        <div className="text-center mb-3">
          <h2 style={{ color: '#b35ea0' }}>
            Bab<span style={{ color: 'yellow' }}>Y</span>bliss
          </h2>
        </div>
        <div className="box card shadow-lg p-4">
          <h4 className="text-center mb-4" style={{ color: '#b35ea0' }}>
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
                  {/* Email Field */}
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

                  {/* Password Field */}
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

                  {/* Error Message */}
                  {status && status.message && (
                    <div className="alert alert-danger">{status.message}</div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="btn btn-primary w-100 mt-3 py-2"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Logging In...' : 'Login'}
                  </button>
                </Form>
              )}
            </Formik>
          )}

          {!isLoggedIn && (
            <div className="text-center mt-3">
              <h6>
                Don't have an account?{' '}
                <button
                  className="btn btn-link"
                  onClick={() => navigate('/signUP')}
                  style={{ color: 'blue', textDecoration: 'underline' }}
                >
                  Sign Up
                </button>
              </h6>
            </div>
          )}
        </div>
      </div>
      <h6 className="text-center mt-4 text-muted">
        By continuing, I agree to the{' '}
        <a href="#" style={{ color: 'blue' }}>
          Terms of Use
        </a>{' '}
        and{' '}
        <a href="#" style={{ color: 'blue' }}>
          Privacy Policy
        </a>
      </h6>
    </div>
  );
};

export default Login;
