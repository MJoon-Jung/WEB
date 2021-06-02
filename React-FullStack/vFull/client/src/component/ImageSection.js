import React from "react";
import profile from "../images/profile.png";
export default function ImageSection() {
  return (
    <div className="ImageSection">
      <div className="about-img">
        <img src={profile} alt="" className="profile-img" />
      </div>
      <div className="about-info">
        <h3>영진전문대에서 컴퓨터정보계열 2WDJ에 재학중인 정명준입니다.</h3>
        <div className="about-details">
          <div className="left-section">
            <p>이름</p>
            <p>나이</p>
            <p>생년월일</p>
            <p>주소</p>
          </div>
          <div className="right-section">
            <p>: MEOUNG JUN JUNG</p>
            <p>: 25</p>
            <p>: 1997.08.23</p>
            <p>: 대구광역시 경진로남1길 43-1 태릉빌B</p>
          </div>
        </div>
      </div>
    </div>
  );
}
