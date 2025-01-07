import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styles from "./ShowProductItem.module.scss";
import { BounceLoader } from "react-spinners";
import { ChevronLeft } from "lucide-react";

const api = "https://api.escuelajs.co/api/v1/products";

function ShowProductItem() {
  const { id } = useParams("");
  const navigate = useNavigate();

  const [product, setProduct] = useState({});
  const { pathname } = useLocation();
  function getProduct() {
    axios(`${api}/${id}`).then((res) => {
      setProduct(res.data);
    });
  }

  useEffect(() => {
    getProduct();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="container">
       <nav className={styles.backBtns}>
          <span onClick={() => navigate("/")}>Главная</span>
          <span onClick={() => navigate(-1)}>
            <ChevronLeft size={18} />
            Назад
          </span>
        </nav>
      <div className={styles.product_box}>
       
        {"{}" === JSON.stringify(product) ? (
          <BounceLoader size={120} color="#586074" />
        ) : (
          <>
            <div className={styles.item_images}>
              {product.images && (
                <>
                  <span>
                    <img src={product.images[0]} alt="img" />
                  </span>
                  <span>
                    <img src={product.images[1]} alt="img" />
                  </span>
                  <span>
                    <img src={product.images[2]} alt="img" />
                  </span>
                </>
              )}
            </div>
            <div className={styles.item_right}>
              <h2>{product.title}</h2>
              <span>Цена товара: ${product.price}</span>
              <nav>
                <h2>Описание:</h2>
                <p>{product.description}</p>
              </nav>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ShowProductItem;
