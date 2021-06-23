import axios from "axios";
import React, { useState, useEffect } from "react";
export default function ProfileData(props) {
  const [data, setData] = useState({
    name: "",
    gender: "",
    birthday: "",
    intro: "",
  });

  const [onForm, setOnForm] = useState(true);
  const [file, setFile] = useState(null);
  const [isModified, setisModified] = useState(false);

  useEffect(() => {
    if (props.onSettingData) {
      const newData = {
        name: props.name,
        gender: props.gender,
        birthday: props.birthday,
        intro: props.intro,
        img: props.img,
      };
      setData(newData);
      setOnForm(false);
      setisModified(true);
    }
  }, [
    props.img,
    props.name,
    props.gender,
    props.birthday,
    props.intro,
    props.onSettingData,
  ]);

  function onQuit() {
    axios
      .delete("http://localhost:3001/auth/quit", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        console.log(response.data);
        localStorage.removeItem("accessToken");
        window.location.reload();
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
          setOnForm(false);
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
          setOnForm(false);
          window.location.reload();
        });
    }
  }
  function onModified() {
    setOnForm(true);
  }

  let html = (
    <div className="myprofile">
      <div className="myprofile-image">
        <img
          className="profile-preview"
          src={data.img ? `http://localhost:3001/img/${data.img}` : null}
          alt={data.img ? data.img : null}
        />
      </div>
      <table>
        <tr>
          <th style={{ textAlign: "right" }}>이름:</th>
          <td style={{ textAlign: "left" }}>{data.name}</td>
        </tr>
        <tr>
          <th style={{ textAlign: "right" }}>성별:</th>
          <td style={{ textAlign: "left" }}>
            {data.gender === "male" ? "남" : "여"}
          </td>
        </tr>
        <tr>
          <th style={{ textAlign: "right" }}>생년월일:</th>
          <td style={{ textAlign: "left" }}>{data.birthday}</td>
        </tr>
        <tr>
          <th style={{ textAlign: "right" }}>자기소개:</th>
          <td style={{ textAlign: "left" }}>{data.intro}</td>
        </tr>
      </table>
      <button onClick={onModified}>수정하기</button>
      <button onClick={onQuit} style={{ cursor: "pointer" }}>
        회원 탈퇴
      </button>
    </div>
  );
  let html2 = (
    <div className="myprofile">
      <form
        onSubmit={(e) => handleSubmit(e)}
        encType="multipart/form-data"
        style={{ width: "100%" }}
      >
        <table style={{ width: "100%" }}>
          <tr style={{ width: "100%", position: "relative", left: "35%" }}>
            <td colSpan="2">
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
            </td>
          </tr>
          <tr style={{ width: "100%", position: "relative", left: "35%" }}>
            <td colSpan="2">
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
            </td>
          </tr>
          <tr>
            <th style={{ width: "30%", border: "1px solid white" }}>이름</th>
            <td>
              <input
                type="text"
                onChange={(e) => handle(e)}
                id="name"
                required
                style={{ width: "100%" }}
                value={data.name}
              />
            </td>
          </tr>
          <tr>
            <th style={{ width: "30%", border: "1px solid white" }}>성별</th>
            <td>
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
            </td>
          </tr>
          <tr>
            <th style={{ width: "30%", border: "1px solid white" }}>
              생년월일
            </th>
            <td>
              <input
                type="date"
                onChange={(e) => handle(e)}
                id="birthday"
                required
                style={{ width: "100%" }}
                value={data.birthday}
              />
            </td>
          </tr>
          <tr>
            <th style={{ width: "30%", border: "1px solid white" }}>
              자기소개
            </th>
            <td>
              <textarea
                onChange={(e) => handle(e)}
                id="intro"
                value={data.intro}
                style={{ width: "100%" }}
                required
              />
            </td>
          </tr>
        </table>
        <button style={{ position: "relative", width: "100%" }}>등록</button>
      </form>
      <button
        onClick={onQuit}
        style={{
          width: "100px",
          height: "50px",
          position: "absolute",
          top: "20%",
          right: "15%",
          backgroundColor: "rgba(0,0,0,0)",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        회원 탈퇴
      </button>
    </div>
  );
  return onForm ? html2 : html;
}
