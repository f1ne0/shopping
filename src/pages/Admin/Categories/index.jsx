import React, { useEffect, useState } from "react";
import SearchNav from "../../../Components/SearchNav";
import styles from "./Categories.module.scss";
import axios from "axios";
import IsModal from "../../../Components/IsModal";
import { Link, useNavigate } from "react-router-dom";
import EditBtns from "../../../Components/EditBtns";

const api = "https://api.escuelajs.co/api/v1/categories";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [value, setValue] = useState("");

  const [isModal, setIsModal] = useState(false);
  const [id, setId] = useState(null);

  const navigate = useNavigate("");

  function getCategories() {
    axios(api).then((res) => setCategories(res.data));
  }

  useEffect(() => {
    getCategories();
  }, []);

  function deleteCategories() {
    axios
      //===========
      .delete(`https://api.escuelajs.co/api/v1/categories/${id}`)
      .then(() => {
        getCategories();
        setIsModal(false);
      }).catch((er)=>console.log(er)
      );
    
      
    //===========
  }

  return (
    <>
      <h1 className={styles.title}>Categories</h1>
      
      <div className={styles.search_nav}>
        <SearchNav searchValue={value} setSearchValue={setValue} />
        <Link to={"/admin/newcategories"}>new Categories</Link>
      </div>
      <div className={styles.categories_box}>
        {categories
          .filter((item) => {
            return item.name.toLowerCase().includes(value.toLowerCase());
          })
          .map((item) => (
            <div key={item.id}>
              <img src={item.image} alt="img" />
              <div>
                <p>{item.name}</p>
                <EditBtns
                  setIsModal={setIsModal}
                  setId={setId}
                  navigate={navigate}
                  itemId={item.id}
                  navigateValue={"update"}
                />
              </div>
            </div>
          ))}
      </div>
      <IsModal
        isModal={isModal}
        setIsModal={setIsModal}
        deleteItem={deleteCategories}
      />
    </>
  );
}

export default Categories;
