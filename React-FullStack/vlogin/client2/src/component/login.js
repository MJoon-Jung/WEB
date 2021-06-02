import React, { useState } from "react";
export default function login() {
  return (
    <form>
      <label>id</label>
      <input type="text" />
      <label>password</label>
      <input type="password" />
      <button type="submit">login</button>
    </form>
  );
}
