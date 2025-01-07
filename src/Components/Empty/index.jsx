import React from "react";
import { Link } from "react-router-dom";
import styles from "./Empty.module.scss";
import { Ban, CircleOff } from "lucide-react";

function Empty({ label, text }) {
  return (
    <div className={styles.empty_box}>
      <CircleOff size={50}/>
      <h2>{label}</h2>
      <p>{text}</p>
      
      <Link to={"/"}>Перейти</Link>
    </div>
  );
}

export default Empty;
