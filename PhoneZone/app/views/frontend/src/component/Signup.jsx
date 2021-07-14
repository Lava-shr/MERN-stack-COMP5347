import React, { Component } from "react";
import { Button, CardDeck, Card, Container, Row } from "react-bootstrap";
import { useFormik } from "formik";
import NavBar from "./NavBar";
import "./signIn.css";

function Signup(props) {
  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log("form data", values);
      props.handleSubmit();
    },
    validate: (values) => {
      let errors = {};

      if (!values.name) {
        errors.name = "Required";
      } else if (values.name.length < 2) {
        errors.name = "Minimum 2 characters";
      }
      if (!values.surname) {
        errors.surname = "Required";
      } else if (values.surname.length < 2) {
        errors.surname = "Minimum 2 characters";
      }
      if (!values.email) {
        errors.email = "Required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }
      if (!values.password) {
        errors.password = "Required";
      } else if (values.password.length < 3) {
        errors.password = "Minimum 3 characters";
      }
      return errors;
    },
  });
  //console.log(props);
  return (
    <>
      <NavBar />
      <form className="signInForm" onSubmit={formik.handleSubmit} action="">
        <h3 className="text-center">Sign Up</h3>
        <br />
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Name"
            name="name"
            id="field1"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="error">{formik.errors.name}</div>
          ) : null}
        </div>
        <div className="form-group">
          <label>Surname</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Surname"
            name="surname"
            id="field2"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.surname}
          />
          {formik.touched.surname && formik.errors.surname ? (
            <div className="error">{formik.errors.surname}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            name="email"
            id="field3"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="error">{formik.errors.email}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            name="password"
            id="field4"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="error">{formik.errors.password}</div>
          ) : null}
        </div>
        <button type="submit" className="btn btn-dark">
          Sign Up
        </button>
      </form>
    </>
  );
}

export default Signup;
