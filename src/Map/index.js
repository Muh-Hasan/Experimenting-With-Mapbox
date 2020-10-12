import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";

import "./map.css";

export default function Map() {
  const mapContainer = useRef(null);
  const [lon , setLon] = useState(0)
  const [lat , setLat] = useState(0)
  const token =
    "pk.eyJ1IjoibXVoLWhhc2FuIiwiYSI6ImNrZzRzNXh2dDBuZXoyc2xkMmNvbG52MjQifQ.h9QCn3uBMvqX6KCj26yNTQ";
  mapboxgl.accessToken = token;
  useEffect(() => {
    var geolocate = new mapboxgl.GeolocateControl();

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      zoom: 13,
      center: [4.899, 52.372],
    });

    var geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      marker: true,
    });
    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      })
    );

    var directions = new MapboxDirections({
      accessToken: token,
      unit: "metric",
      profile: "mapbox/driving	",
    });

    map.addControl(geocoder, 'top-right');

    geolocate.on("geolocate", function (e) {
      var lon = e.coords.longitude;
      var lat = e.coords.latitude;
      setLon(lon)
      setLat(lat)
    });
    map.addControl(geolocate);
    map.addControl(directions, "top-left");

    map.addControl(new mapboxgl.NavigationControl(), "bottom-right");

    return () => map.remove();
  }, []);
  return <div className="map-container" ref={mapContainer} />;
}
