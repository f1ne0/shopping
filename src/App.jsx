import React from "react";
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes";
import "./app.css";
import 'leaflet/dist/leaflet.css';

function App() {
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
