'use client';
import React, { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Circle, useMap } from 'react-leaflet';

// Component to handle geolocation updates and display marker/circle
const LocationMarker = ({ initialCenter }) => {
  const [position, setPosition] = useState(initialCenter);
  const map = useMap();

  useEffect(() => {
    setPosition(initialCenter); // Ensure position is initially set

    const watchID = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude, accuracy } = pos.coords;
        if (!isNaN(accuracy)) { // Ensure accuracy is not NaN
          const newPos = { lat: latitude, lng: longitude, accuracy };
          setPosition(newPos);
          map.flyTo(newPos, map.getZoom());

          const circle = L.circle([newPos.lat, newPos.lng], { radius: accuracy });
          map.fitBounds(circle.getBounds());
        }
      },
      (err) => {
        if (err.code === 1) {
          alert('Error: Access is denied!');
        } else {
          alert('Error: Unknown!');
        }
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchID);
    };
  }, [map, initialCenter]);

  return position && (
    <>
      <Marker position={position} />
      {position.accuracy && !isNaN(position.accuracy) && (
        <Circle center={position} radius={position.accuracy} />
      )}
    </>
  );
};

const Maps: React.FC<{ style: React.CSSProperties }> = ({ style }) => {
  const [center, setCenter] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude, accuracy } = pos.coords;
        if (!isNaN(accuracy)) { // Ensure initial accuracy is not NaN
          setCenter({ lat: latitude, lng: longitude });
        }
      },
      (err) => {
        if (err.code === 1) {
          alert('Error: Access is denied!');
        } else {
          alert('Error: Unknown!');
        }
        // Fallback to a default location if geolocation access is denied or an error occurs
        setCenter({ lat: 51.505, lng: -0.09 });
      }
    );
  }, []);

  if (!center) {
    // Wait for initial geolocation before rendering the map
    return <div>Loading map...</div>;
  }

  return (
    <MapContainer
      center={center}
      zoom={13}
      style={style}
      zoomControl={false}
    >
      <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" maxZoom={19} />
      <LocationMarker initialCenter={center} />
    </MapContainer>
  );
};

export default Maps;
