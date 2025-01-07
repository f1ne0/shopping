import React from "react";
import styles from "./RoleUsers.module.scss";






function RoleUsers({ setSelectValue}) {
  return (
    <div className={styles.select_role}>
      <select name="" id="" onChange={(e) => setSelectValue(e.target.value)}>
        <option value="All">All</option>
        <option value="Customer">customer</option>
        <option value="Admin">admin</option>
      </select>
    </div>
  );
}

export default RoleUsers;
