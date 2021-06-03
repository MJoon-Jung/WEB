import React, { useEffect, useState } from "react";
import axios from "axios";
import Postslist from "../component/Postslist";
import Pagination from "../component/Pagination";

export default function UsersPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(8);

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

  const html = (
    <div className="post-content">
      <div className="post-container">
        <div className="form-search">
          <form name="srhform" method="get">
            <div className="input-wrap">
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
  return html;
}
