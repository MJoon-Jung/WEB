import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import LoadingPage from "./LoadingPage";
export default function ProfileHTML(props) {
  let history = useHistory();
  const [data, setData] = useState({
    name: "",
    gender: "",
    birthday: "",
    intro: "",
  });

  const [file, setFile] = useState(null);
  const [isModified, setisModified] = useState(false);
  const [isAuth, setIsAuth] = useState(true);
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
    if (!props.NoneData) {
      setData(props.location.state.data);
      setisModified(true);
      console.log(props.location.state.data);
    }
  }, [props.NoneData, props.location]);

  function handle(e) {
    let newdata = { ...data };
    if (e.target.type === "radio") {
      newdata["gender"] = e.target.value;
    } else {
      newdata[e.target.id] = e.target.value;
    }
    setData(newdata);
    console.log(data);
  }
  function formDataSetting(formData) {
    formData.append("name", data["name"]);
    formData.append("gender", data["gender"]);
    formData.append("birthday", data["birthday"]);
    formData.append("intro", data["intro"]);
  }
  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    if (!isModified) {
      formData.append("img", file);
      formDataSetting(formData);
      axios
        .post("http://localhost:3001/profile/img", formData, {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then(() => {
          history.push("/profile");
          window.location.reload();
        });
    } else {
      if (file !== null) {
        formData.append("img", file);
      }
      formDataSetting(formData);

      axios
        .put("http://localhost:3001/profile/img", formData, {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          console.log(response.data);
          history.push("/profile");
          window.location.reload();
        });
    }
  }

  const html = (
    <div>
      <form onSubmit={(e) => handleSubmit(e)} encType="multipart/form-data">
        <br />
        {isModified ? (
          <img
            className="profile-preview"
            src={
              file
                ? URL.createObjectURL(file)
                : `http://localhost:3001/img/${data.img}`
            }
            alt={file ? file.name : data.img}
          />
        ) : (
          <img
            className="profile-preview"
            src={file ? URL.createObjectURL(file) : null}
            alt={file ? file.name : null}
          />
        )}
        {isModified ? (
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
        ) : (
          <input
            type="file"
            accept="image/*"
            required
            onChange={(e) => setFile(e.target.files[0])}
          />
        )}
        <br />
        <label>이름</label>
        <input
          type="text"
          onChange={(e) => handle(e)}
          id="name"
          required
          value={data.name}
        />
        <label>성별</label>
        <label>남</label>
        <input
          type="radio"
          id="male"
          name="gender"
          value="male"
          required
          checked={data.gender === "male"}
          onChange={(e) => handle(e)}
        />
        <label>여</label>
        <input
          type="radio"
          id="female"
          name="gender"
          value="female"
          required
          checked={data.gender === "female"}
          onChange={(e) => handle(e)}
        />
        <input
          type="date"
          onChange={(e) => handle(e)}
          id="birthday"
          required
          value={data.birthday}
        />
        <textarea
          onChange={(e) => handle(e)}
          id="intro"
          value={data.intro}
          required
        />
        {isModified ? <button>수정</button> : <button>등록</button>}
      </form>
    </div>
  );
  function goHome() {
    if (!isLoading) {
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
