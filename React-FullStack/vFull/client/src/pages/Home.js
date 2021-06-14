import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3001/profile/profiles").then((response) => {
      setData(response.data);
    });
  }, []);

  return data !== null ? (
    <div className="home">
      <div className="listOfProfiles">
        {data.map((value, key) => {
          return (
            <div key={key} className="profile-info">
              <div className="h-myprofile-image">
                <img
                  className="h-profile-preview"
                  src={
                    value.img ? `http://localhost:3001/img/${value.img}` : null
                  }
                  alt={value.img ? value.img : null}
                />
              </div>
              <div className="h-myprofile-name">
                <div>이름:</div>
                <div>{value.name}</div>
              </div>
              <div className="h-myprofile-gender">
                <div>성별:</div>
                <div>{value.gender === "male" ? "남" : "여"}</div>
              </div>
              <div className="h-myprofile-birthday">
                <div>생년월일:</div>
                <div>{value.birthday}</div>
              </div>
              <div className="h-myprofile-intro">
                <div>자기소개:</div>
                <div>{value.intro}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  ) : (
    <div>aaaa</div>
  );
}
