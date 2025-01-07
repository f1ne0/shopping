import React from "react";
import "./UpdateUsers.module.scss";
import { useParams } from "react-router-dom";

function UpdateUsers() {
  const { id } = useParams();
  return (
    <div>
      <h1>UpdateUsers</h1>
    </div>
  );
}

export default UpdateUsers;
