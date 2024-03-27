import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { BiShow } from "react-icons/bi";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const initialValues = {

    email: "",
    password: ""
  
  };
  const navigrate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };



const handleSubmit = async (values, { setSubmitting, resetForm }) => {
  try {
    const response = await axios.post('http://localhost:300/login', values);
    console.log(response);
    var token = response.data.token;
    var userId = response.data.data._id
    console.log(token);
    localStorage.setItem('token', token);
    localStorage.setItem('id', userId)
    // Reset the form after successful submission
    alert('login successfully')
    navigrate('/todo')

    resetForm();
  } catch (error) {
    // Handle errors here
alert('user not found');
  } finally {
    // Reset submitting state regardless of success or failure
    setSubmitting(false);
  }
};


  return (
    <div className="d-flex justify-content-center">
      <div>
        <h1>Login</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div>
                <p>Email</p>
                <Field type="email" id="email" name="email" />
                <ErrorMessage name="email" component="div" className="error" />
              </div>

              <div>
                <p>Password</p>
                <Field
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                />
                <button
                  type="button"
                  className="bg-transparent border-0"
                  onClick={togglePasswordVisibility}
                  style={{ marginLeft: "-30px" }}
                >
                  <BiShow />
                </button>
                <ErrorMessage
                  name="password"
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

export default LoginForm;
