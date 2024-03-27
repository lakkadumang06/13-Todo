import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { BiShow } from "react-icons/bi";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AddForm = () => {
    const dispatch = useDispatch();
  const Id = useSelector((state) => state.counter.id);
  const status = useSelector((state) => state.counter.status);
  const data = useSelector((state) => state.counter.data);
  const navigate = useNavigate();


//   let updateid = useSelector((state) => state.user.id);
//   console.log(updateid);
console.log(Id);
  const initialValues = status ? {
    name: data.name,
    email: data.email,
    password: data.password,
    confirmPassword: data.confirmPassword,
    userId: localStorage.getItem("id"),
  }
  :{

    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    userId: localStorage.getItem("id"),
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Please confirm your password"),
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

    const response = status ? axios.put(`http://localhost:300/todo/${Id}`, values) : axios.post("http://localhost:300/todo/addtodo", values);


    console.log(values);
    navigate('/todo')
    setSubmitting(false);
    resetForm();
  
    window.location.reload();
  };

  return (
    <div className="d-flex justify-content-center">
      <div>
        <h1>Add todo</h1>
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

              <div>
                <p>Confirm Password</p>
                <Field
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                />
                <button
                  type="button"
                  className="bg-transparent border-0 "
                  style={{ marginLeft: "-30px" }}
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

export default AddForm;
