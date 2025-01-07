import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import styles from "./Auth.module.scss";
import axios from "axios";
import { ChevronLeft } from "lucide-react";

const api_login = "https://api.escuelajs.co/api/v1/auth/login";
const api_profile = "https://api.escuelajs.co/api/v1/auth/profile";

function Auth() {
  const [pass, setPass] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();

  function login(user) {
    axios
      .post(api_login, JSON.stringify(user), {
        headers: {
          "Content-Type": "application/json", // Указываем, что отправляем JSON
        },
      })
      .then((res) => {
        if (res.status === 201) {
          localStorage.setItem("token", res.data.access_token);
          getProfile();
        }
      })
      .catch((err) => {
        alert("Неверный логин или пароль!");
      });
  }

  function getProfile() {
    axios
      .get(api_profile, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        // console.log(res.status);
        if (res.status === 200) {
          localStorage.setItem("user", JSON.stringify(res.data));
          res.data.role === "admin" ? navigate("/admin") : navigate("/");
        }
      })
      .catch((err) => {
        alert(err);
      });
  }

  function handleSubmit(e) {
    setIsSubmit(true);
    e.preventDefault();
    const user = {
      email: email,
      password: pass,
    };
    login(user);
  }

  return (
    <div className={styles.auth}>
      <nav className={styles.backBtns}>
        <span onClick={() => navigate("/")}>Главная</span>
        <span onClick={() => navigate(-1)}>
          <ChevronLeft size={18} />
          Назад
        </span>
      </nav>
      <div className={styles["box-wrapper"]}>
        <span className={styles["title-1"]}></span>
        <div className={styles.box}>
          <h1>Sign in</h1>
          <form className={styles["form-box"]}>
            <div className={styles["input-group"]}>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                // placeholder="username"
                placeholder="e-mail"
                required
              />
              <input
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                type="password"
                placeholder="password"
                required
              />
            </div>
            <button
              onClick={(e) => handleSubmit(e)}
              className={`${styles["login-btn"]} ${styles.submit} ${
                isSubmit ? styles.submited : ""
              }`}
            >
              Submit
            </button>
            <p className={styles["form-register"]}>
              <Link to={""}>Forgot Password?</Link>
              <Link to={"/reg"}>Register</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Auth;
