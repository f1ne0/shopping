import { useEffect } from "react";
import Empty from "../../../Components/Empty";
import styles from "./Favorites.module.scss";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "../../../Components/ProductItem";
import { deleteAllFavorites } from "../../../store/slices/favSlice";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Favorites() {
  const favorites = useSelector((state) => state.favorite.favorites);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0.1);
  }, []);

  return (
    <div className={styles.favorites_box}>
      <div className="container">
        <nav className={styles.backBtns}>
          <span onClick={() => navigate("/")}>Главная</span>
          <span onClick={() => navigate(-1)}>
            <ChevronLeft size={18} />
            Назад
          </span>
        </nav>
        {favorites.length < 1 ? (
          <div className={styles.empty_box}>
            <Empty
              label={"У вас нет избранных товаров"}
              text={"Добавляйте товары в Избранное с помощью ❤️️"}
            />
          </div>
        ) : (
          <div className={styles.fav_content}>
            <div className={styles.favorites_title}>
              <h2>Избранное ({favorites.length})</h2>
              <button onClick={() => dispatch(deleteAllFavorites())}>
                удалить все
              </button>
            </div>
            <nav>
              {favorites.map((item) => (
                <ProductItem key={item.id} product={item} />
              ))}
            </nav>
          </div>
        )}
      </div>
    </div>
  );
}

export default Favorites;
