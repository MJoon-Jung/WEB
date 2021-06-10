import React from "react";
import ProfileHTML from "./ProfileHTML";
export default function ProfileData(props) {
  function clickHandle(e) {
    console.log("ssss");
    e.preventDefault();
    return (
      <ProfileHTML
        isOnprops={true}
        img={props.img}
        name={props.name}
        gender={props.gender}
        birthday={props.birthday}
        intro={props.intro}
      />
    );
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
      <button onClick={(e) => clickHandle(e)}>수정</button>
    </div>
  );
}
