import React from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation after saving
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';


const OrderDetails = () => {
  const navigate = useNavigate(); // Access the navigate function

  // Initial form values
  const initialValues = {
    fullName: '',
    phoneNumber: '',
    address: '',
    state: '',
    pincode: '',
  };

  // Form validation schema using Yup
  const validationSchema = Yup.object({
    fullName: Yup.string().required('Full Name is required'),
    phoneNumber: Yup.string()
      .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
      .required('Phone Number is required'),
    address: Yup.string().required('Address is required'),
    state: Yup.string().required('State is required'),
    pincode: Yup.string()
      .matches(/^[0-9]{6}$/, 'Pincode must be 6 digits')
      .required('Pincode is required'),
  });

  // Handle form submission
  const handleSave = (values) => {
    // Save the order details to localStorage (or use context/state if preferred)
    localStorage.setItem('orderDetails', JSON.stringify(values));

    // Navigate to the order summary page after saving
    navigate('/order-summary');
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Add delivery address</h2>
      
      {/* Formik Form */}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSave}
      >
        <Form>
          {/* Full Name Field */}
          <div className="mb-3">
            <label htmlFor="fullName" className="form-label">Full Name</label>
            <Field
              type="text"
              className="form-control"
              id="fullName"
              name="fullName"
            />
            <ErrorMessage name="fullName" component="div" className="text-danger" />
          </div>

          {/* Phone Number Field */}
          <div className="mb-3">
            <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
            <Field
              type="tel"
              className="form-control"
              id="phoneNumber"
              name="phoneNumber"
            />
            <ErrorMessage name="phoneNumber" component="div" className="text-danger" />
          </div>

          {/* Address Field */}
          <div className="mb-3">
            <label htmlFor="address" className="form-label">Address</label>
            <Field
              as="textarea"
              className="form-control"
              id="address"
              name="address"
              rows="3"
            />
            <ErrorMessage name="address" component="div" className="text-danger" />
          </div>

          {/* State Field */}
          <div className="mb-3">
            <label htmlFor="state" className="form-label">State</label>
            <Field
              type="text"
              className="form-control"
              id="state"
              name="state"
            />
            <ErrorMessage name="state" component="div" className="text-danger" />
          </div>

          {/* Pincode Field */}
          <div className="mb-3">
            <label htmlFor="pincode" className="form-label">Pincode</label>
            <Field
              type="text"
              className="form-control"
              id="pincode"
              name="pincode"
            />
            <ErrorMessage name="pincode" component="div" className="text-danger" />
          </div>

          {/* Save Button */}
          <button type="submit" className="btn btn-success w-100">Save Address</button>
        </Form>
      </Formik>
    </div>
  );
};

export default OrderDetails;
