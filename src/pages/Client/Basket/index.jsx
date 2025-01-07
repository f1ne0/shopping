import React, { useEffect, useRef } from "react";
import Empty from "../../../Components/Empty";
import styles from "./Basket.module.scss";
import { ChevronLeft, Minus, Plus, Trash2 } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAll,
  deleteItem,
  minusCountBasket,
  plusCountBasket,
} from "../../../store/slices/basketSlice";
import { deleteFavorite } from "../../../store/slices/favSlice";

function Basket() {
  const baskets = useSelector((state) => state.basket.baskets);
  const favorites = useSelector((state) => state.favorite.favorites);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sumProduct = baskets.reduce(
    (acc, item) => acc + item.count * item.price * 3141,
    0
  );

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0.1);
  }, []);

  return (
    <div className="container">
       <nav className={styles.backBtns}>
          <span onClick={() => navigate("/")}>Главная</span>
          <span onClick={() => navigate(-1)}>
            <ChevronLeft size={18} />
            Назад
          </span>
        </nav>
      <div className={styles.basket_box}>
       
        {baskets.length < 1 ? (
          <div className={styles.empty_box}>
            <Empty
              label={"Ваша корзина пуста"}
              text={
                "Начните покупки на главной странице или перейдите в нужную категорию, чтобы добавить товары."
              }
            />
          </div>
        ) : (
          <>
            <div className={styles.basket_inner}>
              <div className={styles.basket_nav}>
                <h2>Корзина</h2>
                <nav>
                  <div>
                    <input type="checkbox" id="selectAllProduct" />
                    <label htmlFor="selectAllProduct">
                      Выбрать все ({baskets.length})
                    </label>
                  </div>

                  <p onClick={() => dispatch(deleteAll())}>
                    <Trash2 size={16} />
                    Удалить выбранные
                  </p>
                </nav>
              </div>

              <ul className={styles.basket_content}>
                {baskets.map((item) => (
                  <li key={item.id}>
                    <input type="checkbox" />
                    <img src={item.images[0] && item.images[0]} alt="img" />
                    <div>
                      <h3>{item.title}</h3>
                      <span>
                        {((item.price * 3141) / 9).toLocaleString("ru-RU")}{" "}
                        сум/мес
                      </span>
                      <div>
                        <p onClick={() => dispatch(deleteItem(item.id))}>
                          удалить
                        </p>
                        {favorites.some((fav) => fav.id === item.id) ? (
                          <p onClick={() => dispatch(deleteFavorite(item.id))}>
                            убрать из избранных
                          </p>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div>
                      <p>{(item.price * 3141).toLocaleString("ru-RU")} сум</p>
                      <nav>
                        <button
                          style={
                            item.count === 1
                              ? { cursor: "not-allowed" }
                              : { cursor: "pointer" }
                          }
                          disabled={item.count <= 1}
                          onClick={() => dispatch(minusCountBasket(item.id))}
                        >
                          <Minus size={18} />
                        </button>
                        <p>{item.count}</p>
                        <button
                          onClick={() => dispatch(plusCountBasket(item.id))}
                        >
                          <Plus size={18} />
                        </button>
                      </nav>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.right}>
              <h2>Ваш заказ</h2>
              <p>
                {baskets.length} товаров на сумму________________{" "}
                {Math.floor(sumProduct).toLocaleString("ru-RU")} сум
              </p>
              <p>
                Скидка__________________________-{" "}
                {Math.floor(sumProduct * 0.1).toLocaleString("ru-RU")} сум
              </p>
              <p>
                Итого___________________________{" "}
                {Math.floor(sumProduct * 0.9).toLocaleString("ru-RU")} сум
              </p>
              <span>
                Служба доставки.
                <Link to={"/basket"}>узнать больше</Link>
              </span>
              <Link to={"/checkout"}>Перейти к оформлению</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Basket;
