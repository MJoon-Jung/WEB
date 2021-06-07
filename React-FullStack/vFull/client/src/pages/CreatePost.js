import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useHistory } from "react-router-dom";
import LoadingPage from "./LoadingPage";
export default function CreatePost(props) {
  let history = useHistory();

  const [isAuth, setIsAuth] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log(props);
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
  }, [props]);

  const initialValues = {
    title:
      props.location.state === undefined ? "" : props.location.state.post.title,
    postText:
      props.location.state === undefined
        ? ""
        : props.location.state.post.postText,
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("You must input a Title!"),
    postText: Yup.string().required(),
  });

  const onSubmit = (data) => {
    if (props.location.state === undefined) {
      axios
        .post("http://localhost:3001/posts", data, {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          console.log(data);
          history.push("/post");
        });
    } else {
      data = { ...data, id: props.location.state.id };
      axios
        .put("http://localhost:3001/posts", data, {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          console.log(data);
          history.push(`/post/${props.location.state.id}`);
          window.location.reload();
        });
    }
  };

  const html = (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <Form className="formContainer">
        <label>제목</label>
        <ErrorMessage name="title" component="span" />
        <Field
          autocomplete="off"
          id="inputCreatePost"
          name="title"
          placeholder="(Ex. Title...)"
        />
        <label>내용</label>
        <ErrorMessage name="postText" component="span" />
        <Field
          component="textarea"
          autocomplete="off"
          id="inputCreatePostText"
          name="postText"
          placeholder="(Ex. Post...)"
        />
        <button type="submit">Posting</button>
      </Form>
    </Formik>
  );
  function goHome() {
    if (isLoading) alert("123123");
    else {
      if (!isAuth) {
        history.push("/login");
      }
    }
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
