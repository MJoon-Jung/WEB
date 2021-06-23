import React, { useEffect, useState, useContext, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import { useHistory } from "react-router-dom";
import LoadingPage from "./LoadingPage";

export default function Post() {
  let { id } = useParams();

  const history = useHistory();
  const [postAuth, setPostAuth] = useState(false);
  const [postObject, setPostObject] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { authState } = useContext(AuthContext);

  const [isAuth, setIsAuth] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const auth = useCallback(() => {
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
            if (postObject.username === response.data.username) {
              setPostAuth(true);
            }
          }
        });
    } else {
      setIsAuth(false);
    }
    setIsLoading(false);
  }, [postObject.username]);
  useEffect(() => {
    axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
      if (!response.data) {
        history.push("/none");
      }
      setPostObject(response.data);
    });

    axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
      setComments(response.data);
    });

    auth();
  }, [auth, history, id]);

  const addComment = () => {
    axios
      .post(
        "http://localhost:3001/comments",
        {
          commentBody: newComment,
          PostId: id,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          const commentToAdd = {
            commentBody: newComment,
            username: response.data.username,
          };
          window.location.reload();
          setComments([...comments, commentToAdd]);
          setNewComment("");
        }
      });
  };

  const deleteComment = (id) => {
    axios
      .delete(`http://localhost:3001/comments/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
        setComments(
          comments.filter((val) => {
            return val.id !== id;
          })
        );
      });
  };

  function deletePost() {
    axios
      .delete(`http://localhost:3001/posts/byId/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        if (!response.data.success) {
          return alert("권한이 없습니다");
        }
        history.push("/post");
        window.location.reload();
      });
  }

  const html = (
    <div className="postPage">
      <div className="postSide">
        <div className="post" id="individual">
          <table>
            <tr>
              <th>제목</th>
              <td>{postObject.title}</td>
            </tr>
            <tr>
              <th>내용</th>
              <td>{postObject.postText}</td>
            </tr>
            <tr>
              <th>글쓴이</th>
              <td>{postObject.username}</td>
            </tr>
            {postAuth ? (
              <div className="post-modify">
                <button onClick={deletePost}>글삭제</button>
                <Link
                  to={{
                    pathname: "/createpost",
                    state: { id: id, post: postObject },
                  }}
                  style={{ color: "GREEN", border: "1px solid white" }}
                >
                  글 수정
                </Link>
              </div>
            ) : (
              <></>
            )}
          </table>
        </div>
      </div>

      <div className="commentSide">
        <div className="addCommentContainer">
          <input
            type="text"
            placeholder="Comment..."
            autoComplete="off"
            value={newComment}
            onChange={(event) => {
              setNewComment(event.target.value);
            }}
          />
          <button onClick={addComment}> Add Comment</button>
        </div>
        <div className="listOfComments">
          {comments.map((comment, key) => {
            return (
              <div
                key={key}
                className="comment"
                style={{
                  color: "yellow",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {comment.commentBody}
                <label style={{ fontSize: "14px" }}>
                  {" "}
                  ({comment.username})
                </label>
                {authState.username === comment.username && (
                  <button
                    style={{ width: "18px" }}
                    onClick={() => {
                      deleteComment(comment.id);
                    }}
                  >
                    X
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
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
