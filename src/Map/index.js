import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "./map.css";

export default function Map() {
  const mapContainer = useRef(null);
  mapboxgl.accessToken =
    "pk.eyJ1IjoibXVoLWhhc2FuIiwiYSI6ImNrZzRzNXh2dDBuZXoyc2xkMmNvbG52MjQifQ.h9QCn3uBMvqX6KCj26yNTQ";

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
    });
  }, []);
  return <div className="map-container" ref={mapContainer} />;
}
