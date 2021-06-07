import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import LoadingPage from "./LoadingPage";
import ProfileData from "./ProfileData";

export default function Profile() {
  const [file, setFile] = useState(null);
  const [data, setData] = useState({
    name: "",
    gender: "",
    birthday: "",
    intro: "",
  });

  let history = useHistory();

  const [isAuth, setIsAuth] = useState(true);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGetData, setISGetData] = useState(false);

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
            setUser(response.data);
          }
        });
    } else {
      setIsAuth(false);
    }
    getProfile();
    setIsLoading(false);
  }, []);

  function getProfile() {
    axios
      .get(`http://localhost:3001/profile/`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        if (response.data) {
          setData(response.data);
          setISGetData(true);
          console.log(response.data);
        }
      });
  }

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
  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("img", file);
    formData.append("name", data["name"]);
    formData.append("gender", data["gender"]);
    formData.append("birthday", data["birthday"]);
    formData.append("intro", data["intro"]);
    axios
      .post("http://localhost:3001/profile/img", formData, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        console.log(response.data);
        window.location.reload();
      });
  }

  const html = isGetData ? (
    <ProfileData
      img={data.img}
      name={data.name}
      gender={data.gender}
      birthday={data.birthday}
      intro={data.intro}
    />
  ) : (
    <div>
      <form onSubmit={(e) => handleSubmit(e)} encType="multipart/form-data">
        <br />
        <img
          className="profile-preview"
          src={file ? URL.createObjectURL(file) : null}
          alt={file ? file.name : null}
        />
        <input
          type="file"
          accept="image/*"
          required
          onChange={(e) => setFile(e.target.files[0])}
        />
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
        <button>등록</button>
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
