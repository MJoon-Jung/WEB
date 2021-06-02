import React from "react";
import { Link } from "react-router-dom";
export default function NonePage() {
  return (
    <div>
      <h1>403 NOT FOUND</h1>
      {<Link to="/">돌아가기</Link>}
    </div>
  );
}
