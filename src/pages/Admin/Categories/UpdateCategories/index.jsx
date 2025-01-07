import React from "react";
import { useParams } from "react-router-dom";

function UpdateCategories() {
  const { id } = useParams();
  return <div>UpdateCategories</div>;
}

export default UpdateCategories;
