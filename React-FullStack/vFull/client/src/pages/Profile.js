import React, { useState } from "react";
import axios from "axios";
import imageCompression from "browser-image-compression";

export default function Profile() {
  const [data, setData] = useState({
    file: null,
    fileUrl: null,
    name: "",
    gender: "",
    date: "",
    intro: "",
  });

  function handle(e) {
    let newdata = { ...data };
    if (e.target.type === "file") {
      handleFileOnChange(e, newdata);
      return;
    } else if (e.target.type === "radio") {
      newdata["gender"] = e.target.value;
    } else {
      newdata[e.target.id] = e.target.value;
    }
    setData(newdata);
    console.log(data);
  }
  const handleFileOnChange = async (e, newdata) => {
    let file = e.target.files[0]; // 입력받은 file객체
    console.log(file);

    // 이미지 resize 옵션 설정 (최대 width을 100px로 지정)
    const options = {
      maxSizeMB: 2,
      maxWidthOrHeight: 200,
    };

    try {
      const compressedFile = await imageCompression(file, options);
      newdata["file"] = compressedFile;

      // resize된 이미지의 url을 받아 fileUrl에 저장
      imageCompression.getDataUrlFromFile(compressedFile).then((result) => {
        newdata["fileUrl"] = result;
        setData(newdata);
      });
    } catch (error) {
      console.log(error);
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", data["file"]);
    formData.append("fileUrl", data["fileUrl"]);
    formData.append("name", data["name"]);
    formData.append("gender", data["gender"]);
    formData.append("date", data["date"]);
    formData.append("intro", data["intro"]);
    axios
      .post("http://localhost:3001/profile/", data, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        console.log(response.data);
      });
  }

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)} encType="multipart/form-data">
        <br />
        <input type="file" accept="image/*" onChange={handle} />

        {data.fileUrl !== null ? (
          <img
            className="profile-preview"
            src={data.fileUrl}
            alt="profile_img"
          />
        ) : (
          <div className="profile-none"></div>
        )}
        <br />
        <label>이름</label>
        <input
          type="text"
          onChange={(e) => handle(e)}
          id="name"
          value={data.name}
        />
        <label>성별</label>
        <label>남</label>
        <input
          type="radio"
          id="male"
          name="gender"
          value="male"
          checked={data.gender === "male"}
          onChange={(e) => handle(e)}
        />
        <label>여</label>
        <input
          type="radio"
          id="female"
          name="gender"
          value="female"
          checked={data.gender === "female"}
          onChange={(e) => handle(e)}
        />
        <input
          type="date"
          onChange={(e) => handle(e)}
          id="date"
          value={data.date}
        />
        <textarea onChange={(e) => handle(e)} id="intro" value={data.intro} />
        <button>등록</button>
      </form>
    </div>
  );
}
