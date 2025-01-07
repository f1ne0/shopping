import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../../Components/Header";
import Footer from "../../../Components/Footer";
import styles from "./HomeClient.module.scss";

function HomeClient() {
  return (
    <div className={styles.home_content}>
      <Header />

      <Outlet />

      <Footer />
    </div>
  );
}

export default HomeClient;
