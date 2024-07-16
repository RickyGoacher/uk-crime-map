'use client';
import "leaflet/dist/leaflet.css";
import classes from "@/app/components/Map.module.css";
import 'leaflet-defaulticon-compatibility';
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { MapContainer, TileLayer} from 'react-leaflet';
import { useState, useEffect } from "react";
import MapSearch from "./MapSearch/MapSearch";
import MapLocation from "./MapLocation/MapLocation";

const Map = () => {

    const [getIsDefined, setIsDefined] = useState(false)

    useEffect(() => {

      if (typeof window !== "undefined") {
        setIsDefined(true);
      }

    }, [getIsDefined]);
  
    return (
      <section className={classes['map-container']}>
        <h1>UK Crime Map</h1>
        { getIsDefined &&
            <MapContainer className={classes["map"]}
                center={{ lat: 52.629831, lng: -1.132503 }}
                zoom={19}
                scrollWheelZoom={false}
                style={{ height: "100%", width: "100%" }}
            >
                <MapSearch />
                <MapLocation />
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                /> 
            </MapContainer>
        }
        <div className={classes["map-instructions"]}>
            <h2>Instructions</h2>
            <p> - Use the search to locate a specifc area.</p>
            <p> - To view the crime data of a specific area zoom into the location.</p>
            <p> - The information in the bottom left corner informs you if data is avaialable and your current zoom level.</p>
            <p> - Select year and month, this defaults to latest if data is not available.</p>
        </div>
      </section>
    );
}

export default Map;