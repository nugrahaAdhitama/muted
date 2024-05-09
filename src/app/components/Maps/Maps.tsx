'use client';
import React, { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Circle, useMap } from 'react-leaflet';

interface LatLng {
  lat: number;
  lng: number;
  accuracy?: number;
}

interface LocationMarkerProps {
  initialCenter: LatLng;
}

// Component to handle geolocation updates and display marker/circle
const LocationMarker: React.FC<LocationMarkerProps> = ({ initialCenter }) => {
  const [position, setPosition] = useState<LatLng>(initialCenter);
  const map = useMap();

  useEffect(() => {
    setPosition(initialCenter); // Ensure the initial position is set

    const watchID = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude, accuracy } = pos.coords;
        if (!isNaN(accuracy)) {
          const newPos = { lat: latitude, lng: longitude, accuracy };
          setPosition(newPos);
          map.flyTo(newPos, map.getZoom());
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
      <Marker position={[position.lat, position.lng]} />
      {position.accuracy && !isNaN(position.accuracy) && (
        <Circle center={[position.lat, position.lng]} radius={position.accuracy} />
      )}
    </>
  );
};

const Maps: React.FC<{ style: React.CSSProperties }> = ({ style }) => {
  const [center, setCenter] = useState<LatLng | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        if (!isNaN(latitude) && !isNaN(longitude)) { // Additional checks to ensure lat and lng are not NaN
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
