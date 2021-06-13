import React, { useState, useEffect } from "react";
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
      <table>
        <tr>
          <th>이름</th>
          <td>{data.name}</td>
        </tr>
        <tr>
          <th>성별</th>
          <td>{data.gender}</td>
        </tr>
        <tr>
          <th>생년월일</th>
          <td>{data.birthday}</td>
        </tr>
        <tr>
          <th>자기소개</th>
          <td>{data.intro}</td>
        </tr>
      </table>
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
