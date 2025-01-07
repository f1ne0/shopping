import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./UpdateProduct.module.scss";
const api = "https://api.escuelajs.co/api/v1/products";

function UpdateProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [products, setProducts] = useState([]);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [catValue, setCatValue] = useState("");

  const navigate = useNavigate("");

  function getProducts() {
    axios(`${api}`).then((res) => {
      setProducts(res.data);
    });
  }

  function getProduct() {
    axios(`${api}/${id}`).then((res) => {
      setProduct(res.data);
    });
  }

  function putProduct(e) {
    // e.preventDefault();
    axios
      .put(`${api}/${id}`, {
        title,
        price,
        description: desc,
        category: {
          name: catValue,
        },
      })
      .then(() => {
       
        navigate(`/admin/new/${id}`);
        // navigate(`/admin/products`);
        console.log(catValue)
      });
  }

  useEffect(() => {
    getProduct();
    getProducts();
  }, []);

  useEffect(() => {
    setTitle(product.title);
    setPrice(product.price);
    setDesc(product.description);
    setCatValue(product.category?.name);
  }, [product]);

  return (
    <div className={styles.box}>
      <form className={styles.form_list}>
        <input
          type="text"
          placeholder="Title"
          value={title || ""}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          value={price || ""}
          onChange={(e) => setPrice(e.target.value)}
        />
        <textarea
          placeholder="Desc"
          value={desc || ""}
          onChange={(e) => setDesc(e.target.value)}
        ></textarea>

        <select value={catValue} onChange={(e) => setCatValue(e.target.value)}>
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
        </select>
        <button onClick={putProduct}>Submit</button>
      </form>
    </div>
  );
}

export default UpdateProduct;
