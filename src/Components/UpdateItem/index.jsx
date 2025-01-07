import React from "react";
import styles from "./UpdateItem.module.scss";
import { useParams } from "react-router-dom";
function UpdateItem() {
  const {id}= useParams("")

  return (
    <div className={styles.box}>
      <form className={styles.form_list}>
        <input
          type="text"
          placeholder="Title"
          // value={title || ""}
          // onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          // value={price || ""}
          // onChange={(e) => setPrice(e.target.value)}
        />
        <textarea
          placeholder="Desc"
          // value={desc || ""}
          // onChange={(e) => setDesc(e.target.value)}
        ></textarea>
        <select>
          <option value="1">1</option>
          <option value="1">1</option>
          <option value="1">1</option>
          <option value="1">1</option>
          <option value="1">1</option>
          <option value="1">1</option>
          <option value="1">1</option>
        </select>
        {/* <select value={catValue} onChange={(e) => setCatValue(e.target.value)}>
          {products
            .filter((item, index, arr) => {
              return (
                arr.findIndex(
                  (val) =>
                    val.category.name.toLowerCase() ===
                    item.category.name.toLowerCase()
                ) === index
              );
            })
            .map((item) => (
              <option key={item.category.id} value={item.category.name}>
                {item.category.name}
              </option>
            ))}
        </select> */}
        {/* <button onClick={putProduct}>Submit</button> */}
        <button>Submit</button>
      </form>
    </div>
  );
}

export default UpdateItem;
