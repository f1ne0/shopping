import React from "react";
import styles from "./IsModal.module.scss";

function IsModal({ isModal, setIsModal, deleteItem }) {
  return (
    <>
      {isModal && (
        <div className={styles.modal} onClick={() => setIsModal(false)}>
          <div
            className={styles.modal_inner}
            onClick={(e) => e.stopPropagation()}
          >
            <h1>вы уверены?</h1>
            <span>
              <button onClick={deleteItem}>удалить</button>
              <button onClick={() => setIsModal(false)}>отмена</button>
            </span>
          </div>
        </div>
      )}
    </>
  );
}

export default IsModal;
