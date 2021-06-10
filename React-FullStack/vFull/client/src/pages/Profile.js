import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import LoadingPage from "./LoadingPage";
import ProfileData from "./ProfileData";
import ProfileHTML from "./ProfileHTML";

export default function Profile() {
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

  const html = isGetData ? (
    <ProfileData
      img={data.img}
      name={data.name}
      gender={data.gender}
      birthday={data.birthday}
      intro={data.intro}
    />
  ) : (
    <ProfileHTML isOnData={false} />
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
