import React, { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import {
  ChevronDown,
  Heart,
  MapPin,
  Phone,
  ShoppingCart,
  UserRound,
} from "lucide-react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../../store/slices/userSlice";

import ClientSearch from "../ClientSearch";

const api = "https://api.escuelajs.co/api/v1";

function Header() {
  const [categories, setCategories] = useState([]);

  const [isQuitBtn, setIsQuitBtn] = useState(false);

  const baskets = useSelector((state) => state.basket.baskets);
  const favorites = useSelector((state) => state.favorite.favorites);
  let data = JSON.parse(localStorage.getItem("user"));

  const userData = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  function getCategories() {
    axios(`${api}/categories`).then((res) => setCategories(res.data));
  }

  function handleQuit() {
    dispatch(deleteUser());
  }

  useEffect(() => {
    getCategories();
    setIsQuitBtn(false)
   
  }, []);


  return (
    <div className={styles.header} >
      <div className={styles.header_top}>
        <div className="container">
          <div className={styles.header_top_inner}>
            <nav className={styles.nav_list}>
              <Link className={styles.nav_list_left} to={"/"}>
                <span>
                  <Phone size={16} />
                </span>
                <p>+998 71 203 33 33</p>
              </Link>
              <Link className={styles.nav_list_right} to={"/"}>
                <span>
                  <MapPin size={16} />
                </span>
                <p>Ташкент</p>
              </Link>
            </nav>
            <ul className={styles.menu_list}>
              <li>
                <Link>О нас</Link>
              </li>
              <li>
                <Link>Юридическим лицам</Link>
              </li>
              <li>
                <Link>Доставка</Link>
              </li>
              <li>
                <Link>Магазины</Link>
              </li>
              <li>
                <Link>Связаться с нами!</Link>
              </li>
              <li>
                <p>Русский</p>
                <span>
                  <ChevronDown size={16} />
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container">
        <div className={styles.header__middle}>
          <Link to={"/"}>
            <h1>LOGO</h1>
          </Link>

          <div className={styles.input_box}>
            <ClientSearch />
            <div className={styles.nav_box}>
              <Link to={"/basket"}>
                <ShoppingCart />
                <p>Корзина</p>
                <span
                  style={
                    baskets.length === 0
                      ? { display: "none" }
                      : { display: "block" }
                  }
                >
                  {baskets.length}
                </span>
              </Link>
              <Link to={"/favorites"}>
                <Heart />
                <p>Избранное</p>

                <span
                  style={
                    favorites.length === 0
                      ? { display: "none" }
                      : { display: "block" }
                  }
                >
                  {favorites.length}
                </span>
              </Link>

              {localStorage.getItem("user") ? (
                <div className={styles.profile_img_box}>
                  <picture onClick={() => setIsQuitBtn((val) => !val)}>
                    <img src={data.avatar} alt="profile" />
                  </picture>
                  <span className={styles.user_name}>{data.name}</span>
                  <button
                    onClick={handleQuit}
                    className={
                      isQuitBtn
                        ? `${styles.quit_btn} ${styles.show}`
                        : styles.quit_btn
                    }
                  >
                    выйти
                  </button>
                </div>
              ) : (
                <Link to={"/auth"}>
                  <UserRound />
                  <p>Войти</p>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.header_bottom}>
        <div className="container">
          <ul>
            <li className={styles.title}></li>
            {categories
              .filter((item, index, arr) => {
                return arr.findIndex((a) => a.name === item.name) === index;
              })
              //==filter "new"
              .filter((item) => {
                return (
                  !item.name.toLowerCase().includes("new") &&
                  !item.name.toLowerCase().includes("test")
                );
              })
              //=================
              .map((el) => (
                <li key={el.id} className={styles.swiper_slide}>
                  <Link to={"/"}>{el.name}</Link>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
