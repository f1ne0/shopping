import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./Products.module.scss";
import { Link, useNavigate } from "react-router-dom";
import SearchNav from "../../../Components/SearchNav";
import SelectNav from "../../../Components/SelectNav";
import IsModal from "../../../Components/IsModal";
import EditBtns from "../../../Components/EditBtns";

const api = "https://api.escuelajs.co/api/v1";

function Products() {
  const [products, setProducts] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const [id, setId] = useState(null);

  const [searchValue, setSearchValue] = useState("");
  const [selectValue, setSelectValue] = useState("");

  const navigate = useNavigate("");

  function getProducts() {
    axios(`${api}/products`).then((res) => setProducts(res.data));
  }
  function deleteProduct() {
    axios
      //===========
      .delete(`${api}/products/${id}`)
      .then(() => {
        setIsModal(false);
        getProducts();
      });
    //===========
  }
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className={styles.products}>
      <div className={styles.products_top}>
        <h1>Products</h1>
        <Link to={"/admin/new"}>new product</Link>
      </div>
      <div className={styles.filter_product}>
        <SearchNav searchValue={searchValue} setSearchValue={setSearchValue} />
        <SelectNav setSelectValue={setSelectValue} />
      </div>
      <table className={styles.item_list}>
        <thead>
          <tr>
            <td>title</td>
            <td>price</td>
            <td>images</td>
            <td>Category</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {products
            .filter((item) => {
              if (selectValue === "All") {
                return true;
              }
              return item.category.name
                .toLowerCase()
                .includes(selectValue.toLowerCase());
            })
            .filter((item) => {
              return item.title
                .toLowerCase()
                .includes(searchValue.toLowerCase());
            })
            .map((item, index) => (
              <tr key={index}>
                <td>{item.title}</td>
                <td>${item.price}</td>
                <td>
                  <img src={item.images[0]} alt="img" />
                </td>
                <td>{item.category.name}</td>
                <td>
                  <EditBtns
                    setIsModal={setIsModal}
                    setId={setId}
                    navigate={navigate}
                    itemId={item.id}
                    navigateValue={"new"}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <IsModal
        isModal={isModal}
        setIsModal={setIsModal}
        deleteItem={deleteProduct}
      />
    </div>
  );
}

export default Products;
