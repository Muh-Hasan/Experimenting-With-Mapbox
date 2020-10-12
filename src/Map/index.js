import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css'

import "./map.css";

export default function Map() {
  const mapContainer = useRef(null);
  const token =
    "pk.eyJ1IjoibXVoLWhhc2FuIiwiYSI6ImNrZzRzNXh2dDBuZXoyc2xkMmNvbG52MjQifQ.h9QCn3uBMvqX6KCj26yNTQ";
  mapboxgl.accessToken = token;
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      zoom: 13,
      center: [4.899, 52.372],
    });
    var directions = new MapboxDirections({
      accessToken: token,
      unit: 'metric',
      profile: 'mapbox/driving	'
    });    
    map.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
      })
    );
    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      })
    );
    map.addControl(directions, 'top-left');
    map.addControl(new mapboxgl.NavigationControl(), "bottom-right");
    return () => map.remove();
  }, []);
  return <div className="map-container" ref={mapContainer} />;
}
