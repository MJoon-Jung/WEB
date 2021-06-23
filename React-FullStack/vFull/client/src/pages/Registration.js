import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useHistory } from "react-router-dom";
import LoadingPage from "./LoadingPage";
export default function Registration() {
  let history = useHistory();

  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(4).max(15).required(),
    password: Yup.string().min(7).max(20).required(),
  });

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      axios
        .get("http://localhost:3001/auth/auth", {
          headers: {
            accessToken: token,
          },
        })
        .then((response) => {
          if (response.data.error) {
            localStorage.removeItem("accessToken");
          } else {
            setIsAuth(true);
          }
        });
    } else {
      setIsAuth(false);
    }
    setIsLoading(false);
  }, []);

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/auth", data).then((res) => {
      if (res.data.error) {
        alert(res.data.error);
      } else {
        history.push("/login");
      }
      window.location.reload();
    });
  };

  const html = (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Username: </label>
          <ErrorMessage name="username" component="span" />
          <br />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="username"
            placeholder="(Ex. John123...)"
          />
          <br />
          <label>Password: </label>
          <ErrorMessage name="password" component="span" />
          <br />
          <Field
            autocomplete="off"
            type="password"
            id="inputCreatePost"
            name="password"
            placeholder="Your Password..."
          />
          <br />
          <button type="submit"> Register</button>
        </Form>
      </Formik>
    </div>
  );

  function showHTML() {
    return isLoading ? (
      <LoadingPage />
    ) : isAuth ? (
      <LoadingPage>{history.push("/")}</LoadingPage>
    ) : (
      html
    );
  }

  return showHTML();
}
