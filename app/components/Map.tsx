'use client';
import "leaflet/dist/leaflet.css";
import classes from "@/app/components/Map.module.css";
import 'leaflet-defaulticon-compatibility';
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { MapContainer, TileLayer} from 'react-leaflet';
import { LatLngExpression, LatLngTuple } from 'leaflet';
import { useState, useEffect } from "react";
import MapLocation from "./MapLocation/MapLocation";

interface MapProps {
    posix: LatLngExpression | LatLngTuple,
    zoom?: number,
}
 
const Map = () => {

    const [getIsDefined, setIsDefined] = useState(false)

    useEffect(() => {
      if (typeof window !== "undefined") {
        setIsDefined(true);
      }
    }, [getIsDefined]) 

  
    return (
      <>
        { getIsDefined &&
        <MapContainer className={classes["map"]}
              center={{ lat: 52.629831, lng: -1.132503 }}
              zoom={19}
              scrollWheelZoom={false}
              style={{ height: "100%", width: "100%" }}
          >
            <MapLocation />
              <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
             
          </MapContainer>
  
        }
      </>
    );

}

export default Map;