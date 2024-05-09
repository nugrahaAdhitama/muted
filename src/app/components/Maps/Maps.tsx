"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Circle, useMap } from "react-leaflet";

interface LatLng {
  lat: number;
  lng: number;
  accuracy?: number;
}

interface LocationMarkerProps {
  initialCenter: LatLng;
}

interface Report {
  lat?: number;
  lng?: number;
  accuracy?: number;
}

// Component to handle geolocation updates and display marker/circle
const LocationMarker: React.FC<LocationMarkerProps> = ({ initialCenter }) => {
  const [position, setPosition] = useState<LatLng>(initialCenter);
  const map = useMap();
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    // Fetch data from the API endpoint
    async function fetchReports() {
      try {
        const response = await axios.get("/api/reports");
        // Update state with fetched data
        setReports(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    // Call the fetchReports function when the component mounts
    fetchReports();
  }, []);

  useEffect(() => {
    setPosition(initialCenter); // Make sure the initial position is set

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
          alert("Error: Access is denied!");
        } else {
          alert("Error: Unknown!");
        }
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchID);
    };
  }, [map, initialCenter]);

  return (
    <>
      <Marker position={[position.lat, position.lng]} />
      {position.accuracy && !isNaN(position.accuracy) && (
        <Circle
          center={[position.lat, position.lng]}
          radius={position.accuracy}
        />
      )}

      {reports &&
        reports.map((report, index) => {
          if (report.lat !== undefined && report.lng !== undefined) {
            return (
              <Circle
                key={index}
                center={[report.lat, report.lng]}
                radius={1000}
                pathOptions={{
                  fillColor: "orange",
                  fillOpacity: 0.3,
                  color: "orange",
                }}
              />
            );
          }
          return null;
        })}
    </>
  );
};

const Maps: React.FC<{ style: React.CSSProperties }> = ({ style }) => {
  const [center, setCenter] = useState<LatLng | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        if (!isNaN(latitude) && !isNaN(longitude)) {
          setCenter({ lat: latitude, lng: longitude });
        }
      },
      (err) => {
        if (err.code === 1) {
          alert("Error: Access is denied!");
        } else {
          alert("Error: Unknown!");
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
    <MapContainer center={center} zoom={13} style={style} zoomControl={false}>
      <TileLayer
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        maxZoom={19}
      />
      <LocationMarker initialCenter={center} />
    </MapContainer>
  );
};

export default Maps;
