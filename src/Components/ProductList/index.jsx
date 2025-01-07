import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductItem from "../ProductItem";
import styles from "./ProductList.module.scss";
import { BounceLoader } from "react-spinners";

const api = "https://api.escuelajs.co/api/v1";

function ProductList() {
  const [products, setProducts] = useState([]);

  function getProducts() {
    axios(`${api}/products`).then((res) => setProducts(res.data));
  }

  // ?offset=0&limit=3
  useEffect(() => {
    window.scrollTo(0, 0);
    getProducts();
  }, []);
 

  return (
    <>
      <div className="container">
        <div className={styles.box}>
          {products.length < 1 ? (
            <BounceLoader size={120} color="#586074" />
          ) : (
            <div className={styles.box_inner}>
              {products
                // .filter((item) => {
                //   return item.images.length > 1;
                // })
                .map((item) => (
                  <ProductItem key={item.id} product={item} />
                ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ProductList;
