import React, { useRef, useEffect } from "react";
import "./Map.css";

function Map(props) {
  const mapRef = useRef();
  const { center, zoom } = props;

  useEffect(() => {
    const map = new window.google.maps.Map(mapRef.current, {
      center,
      zoom,
      mapId: process.env.REACT_APP_MAP_ID,
    });

    const marker = new window.google.maps.marker.AdvancedMarkerElement({
      position: center,
      map,
    });

    return () => {
      marker.map = null;
    };
  }, [center, zoom]);

  return (
    <div
      ref={mapRef}
      className={`map ${props.className}`}
      style={props.style}
    ></div>
  );
}

export default Map;
