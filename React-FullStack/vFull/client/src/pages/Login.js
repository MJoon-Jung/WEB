import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import LoadingPage from "./LoadingPage";
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthState } = useContext(AuthContext);
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  let history = useHistory();

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
          }
        });
    } else {
      setIsAuth(false);
    }
    setIsLoading(false);
  }, []);

  const login = () => {
    const data = { username: username, password: password };
    axios.post("http://localhost:3001/auth/login", data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        localStorage.setItem("accessToken", response.data.token);
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          status: true,
        });
        history.push("/");
      }
      window.location.reload();
    });
  };

  const html = (
    <div className="loginContainer">
      <label>Username:</label>
      <input
        type="text"
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <label>Password:</label>
      <input
        type="password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />

      <button onClick={login}> Login </button>
    </div>
  );

  function showHTML() {
    return isLoading ? (
      <LoadingPage />
    ) : isAuth ? (
      <LoadingPage>{history.push("/")}</LoadingPage>
    ) : (
      html
    );
  }

  return showHTML();
}
