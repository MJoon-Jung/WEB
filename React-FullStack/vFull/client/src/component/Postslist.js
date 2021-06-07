import React from "react";
import { useHistory } from "react-router-dom";
export default function Postslist({ posts, loading }) {
  let history = useHistory();
  function converting(updatedAt) {
    let tmp = updatedAt.split(" ");
    const date = tmp[0];
    const time = tmp[1];
    const day = date.split("-")[2];
    const today = String(new Date().getDate());
    return Number(today) === Number(day) ? time : date;
  }

  if (loading) {
    return (
      <tr>
        <td>loading</td>
        <td>loading</td>
        <td>loading</td>
        <td>loading</td>
      </tr>
    );
  }
  return posts.map((value) => (
    <tr
      key={value.id}
      className="post"
      onClick={() => {
        history.push(`/post/${value.id}`);
      }}
    >
      <td className="id"> {value.id} </td>
      <td className="title">{value.title}</td>
      <td className="writer">{value.username}</td>
      <td className="date">{converting(value.updatedAt)}</td>
    </tr>
  ));
}
