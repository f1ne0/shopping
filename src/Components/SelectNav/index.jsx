import React, { useEffect, useState } from "react";
import styles from "./SelectNav.module.scss";
import axios from "axios";

const api = "https://api.escuelajs.co/api/v1";

function SelectNav({ setSelectValue }) {
  const [categories, setCategories] = useState([]);

  function getCategories() {
    axios(`${api}/categories`).then((res) => setCategories(res.data));
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className={styles.select_nav}>
      <select
        onChange={(e) => {
          setSelectValue(e.target.value);
        }}
      >
        <option value="All">All</option>
        {categories
          .filter((item, index, arr) => {
            return arr.findIndex((a) => a.name === item.name) === index;
          })
          .map((el) => (
            <option key={el.id} value={el.name}>
              {el.name}
            </option>
          ))}
      </select>
    </div>
  );
}

export default SelectNav;
