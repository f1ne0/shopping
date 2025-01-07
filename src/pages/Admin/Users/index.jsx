import React, { useEffect, useState } from "react";
import styles from "./Users.module.scss";
import axios from "axios";
import SearchNav from "../../../Components/SearchNav";
import RoleUsers from "./RoleUsers";
import { Link, useNavigate } from "react-router-dom";
import IsModal from "../../../Components/IsModal";
import EditBtns from "../../../Components/EditBtns";

const api = "https://api.escuelajs.co/api/v1/users";

function Users() {
  const [users, setUsers] = useState([]);
  const [selectValue, setSelectValue] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const [isModal, setIsModal] = useState(false);
  const [id, setId] = useState(null);

  const navigate = useNavigate("");

  function getProducts() {
    axios.get(api).then((res) => {
      setUsers(res.data);
    });
  }

  function deleteUser() {
    axios
      //===========
      .delete(`${api}/${id}`)
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
    <>
      <h1 className={styles.users_title}>Users</h1>

      <div className={styles.filter_role}>
        <SearchNav searchValue={searchValue} setSearchValue={setSearchValue} />
        <Link to={"/admin/newusers"}>new User</Link>
        <RoleUsers setSelectValue={setSelectValue} />
      </div>
      <table className={styles.item_list}>
        <thead>
          <tr>
            <td>email</td>
            <td>password</td>
            <td>name</td>
            <td>role</td>
            <td>avatar</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {users
            .filter((item) => {
              if (selectValue === "All") return true;
              return item.role
                .toLowerCase()
                .includes(selectValue.toLowerCase());
            })
            .filter((item) => {
              return item.name
                .toLowerCase()
                .includes(searchValue.toLowerCase());
            })
            .map((item, index) => (
              <tr key={index}>
                <td>{item.email}</td>
                <td>{item.password}</td>
                <td>{item.name}</td>
                <td>{item.role}</td>
                <td className={styles.avatar_img}>
                  <img src={item.avatar} alt="" />
                </td>
                <td>
                  <EditBtns
                    setIsModal={setIsModal}
                    setId={setId}
                    navigate={navigate}
                    itemId={item.id}
                    navigateValue={"update"}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <IsModal
        isModal={isModal}
        setIsModal={setIsModal}
        deleteItem={deleteUser}
      />
    </>
  );
}

export default Users;
