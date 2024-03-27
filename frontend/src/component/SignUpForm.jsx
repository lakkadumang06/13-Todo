import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { BiShow } from "react-icons/bi";
import axios from 'axios';

const SignUpForm = () => {
  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Please confirm your password'),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    // Handle form submission here, e.g., send data to server
    const response  = axios.post('http://localhost:300/register', values)
    
    console.log(values);
    setSubmitting(false);
    resetForm();
  };

  return (
<div className='d-flex justify-content-center'>
<div>
      <h1>Sign Up</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
<p>Name</p>
              <Field type="text" id="name" name="name" />
              <ErrorMessage name="name" component="div" className="error" />
            </div>

            <div>
<p>Email</p>
              <Field type="email" id="email" name="email" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>

            <div>
<p>Password</p>
              <Field
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"

              />
              <button
                type="button"
                className='bg-transparent border-0'
                onClick={togglePasswordVisibility}
                style={{ marginLeft: '-30px' }} 
              >
                    <BiShow />

              </button>
              <ErrorMessage
                name="password"
                component="div"
                className="error"
              />
            </div>

            <div>
  <p>Confirm Password</p>
              <Field
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
              />
              <button
                type="button"
                className='bg-transparent border-0 '
                style={{ marginLeft: '-30px' }}
                onClick={toggleConfirmPasswordVisibility}
              >
              <BiShow />
              </button>
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="error"
              />
            </div>

            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
</div>
  );
};

export default SignUpForm;
