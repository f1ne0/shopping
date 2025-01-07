import React from "react";
import styles from "./EditBtns.module.scss";


function EditBtns({setIsModal,setId,navigate,itemId,navigateValue}) {
  return (
    <>
      <div className={styles.btn_wrapper}>
        <button onClick={() => navigate(`/admin/${navigateValue}/${itemId}`)}>
          update
        </button>
        <button
          onClick={() => {
            setIsModal(true);
            setId(itemId);
          }}
        >
          delete
        </button>
      </div>
    </>
  );
}

export default EditBtns;
