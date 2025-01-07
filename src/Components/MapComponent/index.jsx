import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

function MapCheckout() {
  const position = [42.4641, 59.6022];
  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
    >
      {/* <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      /> */}
      <TileLayer
        url="https://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <Marker position={position}>
        <Popup>Это Лондон</Popup>
      </Marker>
    </MapContainer>
  );
}

export default MapCheckout;
