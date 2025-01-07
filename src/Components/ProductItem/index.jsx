import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./ProductItem.module.scss";
import { Heart, ShoppingCart } from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
import { addToBasket } from "../../store/slices/basketSlice";
import { addToFavorites } from "../../store/slices/favSlice";

function ProductItem({ product }) {
  const [isLike, setIsLike] = useState(false);
  const [isCart, setIsCart] = useState(false);

  const favorites = useSelector((state) => state.favorite.favorites);
  const baskets = useSelector((state) => state.basket.baskets);
  const dispatch = useDispatch();

  function handleAddToBasket(product) {
    dispatch(addToBasket(product));
    setIsCart((val) => !val);
  }

  function handleAddToFavorite(product) {
    dispatch(addToFavorites(product));
    setIsLike((val) => !val);
  }

  useEffect(() => {
    setIsLike(favorites.some((item) => item.id === product.id));
    setIsCart(baskets.some((item) => item.id === product.id));
  }, [favorites, baskets, product.id]);

  return (
    <div className={styles.box}>
      <div className={styles.box_inner}>
        <span
          onClick={() => handleAddToFavorite(product)}
          className={`${styles.fav_btn} ${
            isLike ? styles.liked : styles.not_liked
          }`}
        >
          <Heart size={22} />
        </span>
        <Link to={`/product/${product.id}`}>
          <span className={styles.item_img}>
            <img src={product.images[0] && product.images[0]} alt="img" />
          </span>
          <div>
            <h3>{product.title}</h3>
            <nav>
              <span>{product.description}</span>
              <div>
                <p>${product.price + product.id}</p>
                <h4>${product.price}</h4>
              </div>
            </nav>
          </div>
        </Link>
        <span
          onClick={() => handleAddToBasket(product)}
          className={styles.cart_btn}
        >
          <ShoppingCart
            style={
              isCart
                ? { fill: "#d92e15", stroke: "#d92e15" }
                : { fill: "transparent", stroke: "#fff" }
            }
            size={26}
          />
        </span>
      </div>
    </div>
  );
}

export default ProductItem;
