import "./App.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import PostHome from "./pages/PostHome";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import NonePage from "./pages/NonePage";
import Promotion from "./pages/Promotion";
import ProfileHTML from "./pages/ProfileHTML";
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";
import UsersPage from "./pages/UsersPage";
export default function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
        }
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ username: "", id: 0, status: false });
    window.location.reload();
  };

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div className="header">
            <Link to="/" className="header-name">
              Joon's Page
            </Link>
            <div className="navbar">
              {!authState.status ? (
                <>
                  <Link to="/login" className="header-item">
                    {" "}
                    Login
                  </Link>
                  <Link to="/registeration" className="header-item">
                    {" "}
                    Registration
                  </Link>
                </>
              ) : (
                <button className="logoutBtn" onClick={logout}>
                  Logout
                </button>
              )}
              <Link to="/userpage" className="header-username">
                {authState.username}
              </Link>
            </div>
          </div>
          <div className="main-container">
            <div className="sidebar">
              <Link to="/" className="item-link">
                HOME
              </Link>
              <Link to="/profile" className="item-link">
                Profile
              </Link>
              <Link to="/promotion" className="item-link">
                Promotion
              </Link>
              <Link to="/post" className="item-link">
                POST
              </Link>
            </div>

            <div className="main">
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/post" exact component={PostHome} />
                <Route path="/createpost" exact component={CreatePost} />
                <Route path="/post/:id" exact component={Post} />
                <Route path="/registeration" exact component={Registration} />
                <Route path="/login" exact component={Login} />
                <Route path="/profile" exact component={Profile} />
                <Route path="/promotion" exact component={Promotion} />
                <Route path="/userpage" exact component={UsersPage} />
                <Route path="/profileform" exact component={ProfileHTML} />
                <Route exact component={NonePage} />
              </Switch>
            </div>
          </div>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}
