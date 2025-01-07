import React, { useState } from "react";
import styles from "./Reg.module.scss";
import { Link } from "react-router-dom";

function Reg() {
  const [pass, setPass] = useState("");
  const [email, setEmail] = useState("");


  
  return (
    <div className={styles.reg}>
      <div className={styles.wrapper}>
        <span className={styles["title-wel"]}></span>
        <div className={styles.signup_container}>
          <h1>Sign up</h1>
          <form action="">
            <div className={styles["form-group"]}>
              <input type="text" placeholder="name" />
            </div>
            <div className={styles["form-group"]}>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="e-mail"
              />
            </div>
            <div className={styles["form-group"]}>
              <input
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                type="password"
                placeholder="password"
              />
            </div>
            <div className={styles["form-btns"]}>
              <Link to={"/auth"}>sign in</Link>
              <button className={styles["from-btn"]} type="submit">
                Submit
              </button>
              {/* <button className={styles["from-btn"]} type="reset">
                Reset
              </button> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Reg;
