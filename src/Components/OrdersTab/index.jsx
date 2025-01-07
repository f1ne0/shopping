import React from "react";
import { useSelector } from "react-redux";
import styles from "./OrdersList.module.scss";

function OrdersList({ statusValue }) {
  const orders = useSelector((state) => state.checkout.orders);
  // [].;

  function actionStatus(id, action) {
    let UpdatedOrder;
    if (action === "accept") {
      UpdatedOrder= orders.map((item) => {
        let k = null;
        let stts = item.status.map((el, i, arr) => {
          if (Object.values(el)[0] && i < 3) {
            k = i + 1;
            return false;
          } else if (k === i) {
            return true;
          } else {
            return false;
          }
        });
        return {...item,status:stts}
      
        // if (item.id === id) {
        // }
      });
       
    }
    console.log(UpdatedOrder);
    
    localStorage.setItem("orders",JSON.stringify(UpdatedOrder))
    if (action === "reject") {
    }
  }

  return (
    <>
      <table className={styles.item_list}>
        <thead>
          <tr>
            <td>Tel number</td>
            <td>Payment method</td>
            <td>Customer Name</td>
            <td>Location</td>
            <td>Amount</td>
            <td>Status Order</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {orders
            .filter((item) => item.status.some((el) => el[`${statusValue}`]))
            .map((item, index) => (
              <tr key={index}>
                <td>{item.tel}</td>

                <td>
                  {item.payment.map((el) => {
                    if (Object.values(el)[0]) {
                      return Object.keys(el).join();
                    }
                  })}
                </td>
                <td>
                  {item.fullname.name} {item.fullname.surname}
                </td>
                <td>{item.address.join(" ")}</td>
                <td>
                  {item.amount.toLocaleString("ru-RU")} {"сум"}
                </td>
                <td>
                  {item.status.map((el) => {
                    if (Object.values(el)[0]) {
                      return Object.keys(el).join();
                    }
                  })}
                </td>
                <td>
                  <nav>
                    <p onClick={() => actionStatus(item.id, "accept")}>
                      accept
                    </p>
                    <p onClick={() => actionStatus(item.id, "reject")}>
                      reject
                    </p>
                  </nav>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}

export default OrdersList;
