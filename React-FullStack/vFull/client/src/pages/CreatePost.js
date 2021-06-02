import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useHistory } from "react-router-dom";
import LoadingPage from "./LoadingPage";
function CreatePost() {
  let history = useHistory();

  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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

  const initialValues = {
    title: "",
    postText: "",
    username: "",
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("You must input a Title!"),
    postText: Yup.string().required(),
    username: Yup.string().min(3).max(15).required(),
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/posts", data).then((response) => {
      console.log(data);
      history.push("/post");
    });
  };

  const html = (
    <div className="createPostPage">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Title: </label>
          <ErrorMessage name="title" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="title"
            placeholder="(Ex. Title...)"
          />
          <label>Post: </label>
          <ErrorMessage name="postText" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="postText"
            placeholder="(Ex. Post...)"
          />
          <label>Username: </label>
          <ErrorMessage name="username" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="username"
            placeholder="(Ex. John123...)"
          />

          <button type="submit"> Create Post</button>
        </Form>
      </Formik>
    </div>
  );
  function goHome() {
    alert("접근 권한이 없습니다");
    history.push("/login");
  }
  function showHTML() {
    return isLoading ? (
      <LoadingPage />
    ) : isAuth ? (
      html
    ) : (
      <LoadingPage>{goHome()}</LoadingPage>
    );
  }

  return showHTML();
}

export default CreatePost;
