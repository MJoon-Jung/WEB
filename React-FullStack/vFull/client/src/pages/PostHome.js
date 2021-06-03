import React, { useEffect, useState } from "react";
import axios from "axios";
import Postslist from "../component/Postslist";
import { Link } from "react-router-dom";
import Pagination from "../component/Pagination";
import LoadingPage from "./LoadingPage";
import { useHistory } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(8);

  const [isAuth, setIsAuth] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  let history = useHistory();
  useEffect(() => {
    fetchPosts();

    async function fetchPosts() {
      setLoading(true);
      const res = await axios.get("http://localhost:3001/posts");
      setPosts(res.data);
      setLoading(false);
      auth();
    }
    function auth() {
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
    }
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  function paginate(pageNumber) {
    setCurrentPage(pageNumber);
  }

  const html = (
    <div className="post-content">
      <div className="post-container">
        <div className="form-search">
          <form name="srhform" method="get">
            <div className="input-wrap">
              <span className="post-create">
                {<Link to="/createpost">글쓰기</Link>}
              </span>
              <select className="qt">
                <option value="t">제목</option>
                <option value="v">내용</option>
              </select>
              <input type="text" className="keyword" />
              <button type="submit">검색</button>
            </div>
          </form>
        </div>
        <div className="post-inner">
          <div className="board-list">
            <table>
              <tbody>
                <tr>
                  <th>글번호</th>
                  <th>제목</th>
                  <th>글쓴이</th>
                  <th>작성일</th>
                </tr>
                <Postslist posts={currentPosts} loading={loading} />
              </tbody>
            </table>
          </div>
          <div className="pager">
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={posts.length}
              paginate={paginate}
            />
          </div>
        </div>
      </div>
      <footer></footer>
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
export default Home;
