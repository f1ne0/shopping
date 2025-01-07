import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import styles from "./HomeAdmin.module.scss";
import {
  AlignJustify,
  ChartColumnStacked,
  LayoutDashboard,
  ListOrdered,
  LogIn,
  ShoppingCart,
  UsersRound,
  X,
} from "lucide-react";

// const api = "https://api.escuelajs.co/api/v1/products";

const pages = [
  { id: "v1", title: "dashboard", icon: <LayoutDashboard /> },
  {
    id: "v2",
    title: "products",
    icon: <ShoppingCart />,
  },
  { id: "v3", title: "categories", icon: <ChartColumnStacked /> },
  { id: "v4", title: "users", icon: <UsersRound /> },
  { id: "v5", title: "orders", icon: <ListOrdered /> },
];

function HomeAdmin() {
  const [selectedPage, setSelectedPage] = useState("v1");

  return (
    <div className={styles.admin}>
      {/* <nav className={styles.nav_hamburger}>
        <div onClick={(e) => changeSidebar(e)}>
          {closeSidebar ? (
            <span>
              <X />
            </span>
          ) : (
            <span>
              <AlignJustify />
            </span>
          )}
        </div>
      </nav> */}

      <aside>
        <ul>
          <Link to={"/auth"}>
            <LogIn />
            sign in
          </Link>

          {pages.map((page, index) => (
            <li
              key={index}
              className={selectedPage === page.id ? styles.active : ""}
              onClick={() => setSelectedPage(page.id)}
            >
              <Link
                to={
                  page.title === "dashboard" ? "/admin" : `/admin/${page.title}`
                }
              >
                <span>{page.icon}</span>
                <p>{page.title}</p>
              </Link>
            </li>
          ))}
        </ul>
      </aside>
      <div className={styles["admin-content"]}>
        <Outlet />
      </div>
    </div>
  );
}

export default HomeAdmin;
