import React from "react";

export default function ProfileData(props) {
  function clickHandle() {
    console.log("dsds");
  }
  return (
    <div className="myprofile">
      <div className="myprofile-image">
        <img
          className="profile-preview"
          src={props.img ? `http://localhost:3001/img/${props.img}` : null}
          alt={props.img ? props.img : null}
        />
      </div>
      <div className="myprofile-name">
        <div>이름</div>
        <div>{props.name}</div>
      </div>
      <div className="myprofile-gender">
        <div>성별</div>
        <div>{props.gender}</div>
      </div>
      <div className="myprofile-birthday">
        <div>생년월일</div>
        <div>{props.birthday}</div>
      </div>
      <div className="myprofile-intro">
        <div>자기소개</div>
        <div>{props.intro}</div>
      </div>
      <button onClick={clickHandle}>수정</button>
    </div>
  );
}
