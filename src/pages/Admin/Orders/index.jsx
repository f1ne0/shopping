import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./Orders.module.scss";

import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import OrdersList from "../../../Components/OrdersTab";

function Orders() {
  const [value, setValue] = useState("v1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <h1 style={{ marginLeft: "60px" }}> Orders</h1>
      <div className={styles.tabs}>
        <TabContext value={value}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Pending" value="v1" />
            <Tab label="Processing" value="v2" />
            <Tab label="Shipped" value="v3" />
            <Tab label="Delivered" value="v4" />
            <Tab label="Cancelled" value="v5" />
          </TabList>

          <TabPanel value="v1">
            <OrdersList statusValue={"pending"} />
          </TabPanel>
          <TabPanel value="v2">
            <OrdersList statusValue={"processing"} />
          </TabPanel>
          <TabPanel value="v3">
            <OrdersList statusValue={"shipped"} />
          </TabPanel>
          <TabPanel value="v4">
            <OrdersList statusValue={"delivered"} />
          </TabPanel>
          <TabPanel value="v5">
            <OrdersList statusValue={"cancelled"} />
          </TabPanel>
        </TabContext>
      </div>
    </div>
  );
}

export default Orders;
