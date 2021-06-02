import React, { useState } from "react";
export default function Pagination({ postsPerPage, totalPosts, paginate }) {
  const pageNumbers = [];
  const [isSelectedNumber, setIsSelectedNumber] = useState(1);

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="page-list">
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li
            key={number}
            onClick={() => {
              paginate(number);
            }}
            className="page-link"
          >
            {number}
          </li>
        ))}
      </ul>
    </nav>
  );
}
