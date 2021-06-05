import React, { useState } from "react";
import axios from "axios";
import imageCompression from "browser-image-compression";

export default function Profile() {
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);

  const [data, setData] = useState({
    name: "",
    date: "",
    gender: "",
    intro: "",
  });
  const handleFileOnChange = async (e) => {
    let file = e.target.files[0]; // 입력받은 file객체

    // 이미지 resize 옵션 설정 (최대 width을 100px로 지정)
    const options = {
      maxSizeMB: 2,
      maxWidthOrHeight: 200,
    };

    try {
      const compressedFile = await imageCompression(file, options);
      setFile(compressedFile);

      // resize된 이미지의 url을 받아 fileUrl에 저장
      imageCompression.getDataUrlFromFile(compressedFile).then((result) => {
        setFileUrl(result);
      });
    } catch (error) {
      console.log(error);
    }
  };

  function handleSubmit(e) {
    axios
      .post("http://localhost:3001/intro", data, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        console.log(response.data.success);
      });
  }
  // encType="multipart/form-data"

  function handle(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
    console.log(newdata);
  }
  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <br />
        <input type="file" accept="image/*" onChange={handleFileOnChange} />

        {fileUrl !== null ? (
          <img className="profile-preview" src={fileUrl} alt="profile_img" />
        ) : (
          <div className="profile-none"></div>
        )}
        <br />
        <input
          type="text"
          onChange={(e) => handle(e)}
          id="name"
          value={data.name}
        />
        <input
          tpye="date"
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
{
  /* <input type="radio"/>
        <input type="radio"/> */
}
