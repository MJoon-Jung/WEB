import React, { useState, useEffect } from "react";
import ProfileHTML from "./ProfileHTML";
import { Link } from "react-router-dom";
export default function ProfileData(props) {
  const [data, setData] = useState({});

  useEffect(() => {
    const newData = {
      name: props.name,
      gender: props.gender,
      birthday: props.birthday,
      intro: props.intro,
      img: props.img,
    };
    setData(newData);
  }, [props.img, props.name, props.gender, props.birthday, props.intro]);

  let html = (
    <div className="myprofile">
      <div className="myprofile-image">
        <img
          className="profile-preview"
          src={data.img ? `http://localhost:3001/img/${data.img}` : null}
          alt={data.img ? data.img : null}
        />
      </div>
      <div className="myprofile-name">
        <div>이름</div>
        <div>{data.name}</div>
      </div>
      <div className="myprofile-gender">
        <div>성별</div>
        <div>{data.gender}</div>
      </div>
      <div className="myprofile-birthday">
        <div>생년월일</div>
        <div>{data.birthday}</div>
      </div>
      <div className="myprofile-intro">
        <div>자기소개</div>
        <div>{data.intro}</div>
      </div>
      <Link
        to={{
          pathname: "/profileform",
          state: {
            data: data,
          },
        }}
        style={{ color: "GREEN", border: "1px solid white" }}
      >
        글 수정
      </Link>
    </div>
  );
  return html;
}
