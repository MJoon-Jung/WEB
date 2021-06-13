import React, { useEffect, useState } from "react";
import axios from "axios";
import Postslist from "../component/Postslist";
import Pagination from "../component/Pagination";

export default function UsersPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [secondPosts, setSecondPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(8);

  const [searchValue, setSearchValue] = useState("");
  const [selectValue, setSelectValue] = useState("tv");

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:3001/posts/userpage", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((res) => {
        setPosts(res.data);
        setLoading(false);
      });
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  function paginate(pageNumber) {
    setCurrentPage(pageNumber);
  }

  const handleSubmit = (e) => {
    if (searchValue !== "") {
      if (selectValue === "tv") {
        axios
          .get(`http://localhost:3001/posts/titleposttext/${searchValue}`, {
            headers: { accessToken: localStorage.getItem("accessToken") },
          })
          .then((res) => {
            console.log(res.data);
            setPosts(res.data);
          });
      } else if (selectValue === "t") {
        axios
          .get(`http://localhost:3001/posts/title/${searchValue}`, {
            headers: { accessToken: localStorage.getItem("accessToken") },
          })
          .then((res) => {
            console.log(res.data);
            setPosts(res.data);
          });
      } else if (selectValue === "v") {
        axios
          .get(`http://localhost:3001/posts/posttext/${searchValue}`, {
            headers: { accessToken: localStorage.getItem("accessToken") },
          })
          .then((res) => {
            console.log(res.data);
            setPosts(res.data);
          });
      }
    } else {
      setPosts(secondPosts);
    }
    setSearchValue("");
  };
  const searchHandleChange = (e) => {
    setSearchValue(e.target.value);
  };
  const selectHandleChange = (e) => {
    setSelectValue(e.target.value);
    console.log(selectValue);
  };

  const html = (
    <div className="post-content">
      <div className="post-container">
        <h1>내가 쓴 글</h1>
        <div className="form-search">
          <div className="form-searchbox">
            <select
              className="qt"
              value={selectValue}
              onChange={selectHandleChange}
            >
              <option value="tv">제목+내용</option>
              <option value="t">제목</option>
              <option value="v">내용</option>
            </select>
            <input
              type="text"
              value={searchValue}
              onChange={searchHandleChange}
              className="keyword"
            />
            <button type="submit" onClick={handleSubmit}>
              검색
            </button>
          </div>
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
  return html;
}
