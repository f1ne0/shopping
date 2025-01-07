import React from "react";
import { createBrowserRouter } from "react-router-dom";

import HomeClient from "../pages/Client/HomeClient/index";
import Auth from "../pages/Auth";
import Reg from "../pages/Reg";

import Categories from "../pages/Admin/Categories/index";
import Dashboard from "../pages/Admin/Dashboard";
import HomeAdmin from "../pages/Admin/HomeAdmin";
import Products from "../pages/Admin/Products";
import Users from "../pages/Admin/Users";
import NewProducts from "../pages/Admin/Products/NewProducts";
import UpdateProduct from "../pages/Admin/Products/UpdateProduct";
import NewUsers from "../pages/Admin/Users/NewUsers";
import NewCategories from "../pages/Admin/Categories/NewCategories";
import UpdateCategories from "../pages/Admin/Categories/UpdateCategories";
import UpdateUsers from "../pages/Admin/Users/UpdateUsers";
import UpdateItem from "../Components/UpdateItem";
import ClientProducts from "../pages/Client/ClientProducts";
import Basket from "../pages/Client/Basket";
import Favorites from "../pages/Client/Favorites";
import ShowProductItem from "../pages/Client/ShowProductItem";
import Checkout from "../pages/Client/Checkout";
import Orders from "../pages/Admin/Orders";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <HomeClient />,
    children: [
      {
        index: true,
        element: <ClientProducts />,
      },
      {
        path: "/basket",
        element: <Basket />,
      },
      {
        path: "/favorites",
        element: <Favorites />,
      },
      {
        path: "/product/:id",
        element: <ShowProductItem />,
      },
    ],
  },
  {
    path: "/admin",
    element: <HomeAdmin />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "new",
        element: <NewProducts />,
      },
      {
        path: "new/:id",
        element: <UpdateProduct />,
      },
      {
        path: "categories",
        element: <Categories />,
      },
      {
        path: "newcategories",
        element: <NewCategories />,
      },
      {
        path: "newcategories/:id",
        element: <UpdateCategories />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "newusers",
        element: <NewUsers />,
      },
      {
        path: "newusers/:id",
        element: <UpdateUsers />,
      },
      {
        path: "update/:id",
        element: <UpdateItem />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
    ],
  },
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/reg",
    element: <Reg />,
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },
]);
