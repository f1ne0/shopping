import axios from "axios";
import { useEffect, useState } from "react";
// import { useDebounce } from "use-debounce";
import styles from "./ClientSearch.module.scss";
import { Link, useNavigate } from "react-router-dom";

const api = "https://api.escuelajs.co/api/v1";

function ClientSearch() {
  const [searchValue, setSearchValue] = useState("");
  const [products, setProducts] = useState([]);
  const [isBlur, setIsBlur] = useState(false);

  const navigate = useNavigate();

  //   const [debouncedQuery] = useDebounce(searchValue, 500); // Задержка 500 мс

  function getProducts() {
    axios(`${api}/products`).then((res) => setProducts(res.data));
  }

  useEffect(() => {
    getProducts();
  }, []);

  function handleShowProduct(id) {
    navigate(`/product/${id}`);
    setIsBlur(false);
    document.body.style.overflowY = "";
  }

  return (
    <div className={styles.search_nav}>
      <div
        onClick={() => {
          setIsBlur(false);
          document.body.style.overflowY = "";
        }}
        className={
          !isBlur ? styles.bg_blur : `${styles.bg_blur} ${styles.show}`
        }
      ></div>
      <div
        className={styles.bg_blur_inner}
        onClick={(e) => {
          e.target.stopPropagation();
        }}
      >
        <input
          value={searchValue}
          onClick={() => {
            setIsBlur(true);
            document.body.style.overflowY = "hidden";
          }}
          onChange={(e) => setSearchValue(e.target.value)}
          type="text"
          placeholder="Искать товары..."
        />
        {!isBlur || !searchValue ? (
          ""
        ) : (
          <ul className={styles.list_search}>
            {products
              .filter((item) => {
                return item.title
                  .toLowerCase()
                  .includes(searchValue.toLowerCase());
              })
              .map((item) => (
                <Link
                  // to={`/product/${item.id}`}
                  key={item.id}
                  onClick={() => handleShowProduct(item.id)}
                >
                  <li>
                    <img src={item.images[0]} alt="img" />
                    <p> {item.title}</p>
                  </li>
                </Link>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ClientSearch;
