'use client';

import { useMapEvents, useMap } from 'react-leaflet';
import MapMarkers from "../MapMarkers/MapMarkers";
import { useState, useEffect } from "react";
import { LocationInterface } from '@/app/App.types';
import classes from "@/app/components/MapLocation/MapLocation.module.css";

const MapLocation = () => {

    const LeafletMap = useMap();

    const [getCurrentZoom, setCurrentZoom] = useState(19)

    useEffect(() => {
        LeafletMap.locate().on("locationfound", function (e) {
            console.log('this triggers')
            LeafletMap.locate();
        });
        LeafletMap.addEventListener("moveend", () => {
            console.log('move has ended')
        });
        LeafletMap.addEventListener("zoomend", () => {
            setCurrentZoom(LeafletMap.getZoom());
        })
    }, [LeafletMap]);

    const [getCurrentLocation, setCurrentLocation] = useState<LocationInterface>();

    const map = useMapEvents({
    
        dragend(e) {
            if(LeafletMap.getZoom() >= 15) {
                setCurrentLocation(
                    {
                        northEast: {lat: (e.target.getBounds().getNorth()), lng: (e.target.getBounds().getEast()) },
                        northWest: {lat: (e.target.getBounds().getNorth()), lng: (e.target.getBounds().getWest()) },
                        southWest: {lat: (e.target.getBounds().getSouth()), lng: (e.target.getBounds().getWest()) },
                        southEast: {lat: (e.target.getBounds().getSouth()), lng: (e.target.getBounds().getEast()) }
                    }
                );
            }
        },

        moveend(e) {
            if(LeafletMap.getZoom() >= 15) {
                setCurrentLocation(
                    {
                        northEast: {lat: (e.target.getBounds().getNorth()), lng: (e.target.getBounds().getEast()) },
                        northWest: {lat: (e.target.getBounds().getNorth()), lng: (e.target.getBounds().getWest()) },
                        southWest: {lat: (e.target.getBounds().getSouth()), lng: (e.target.getBounds().getWest()) },
                        southEast: {lat: (e.target.getBounds().getSouth()), lng: (e.target.getBounds().getEast()) }
                    }
                );
            }
        },

        locationfound(e) {
            LeafletMap.flyTo(e.latlng, LeafletMap.getZoom());
            if(LeafletMap.getZoom() >= 15) {
                setCurrentLocation(
                    {
                        northEast: {lat: (e.target.getBounds().getNorth()), lng: (e.target.getBounds().getEast()) },
                        northWest: {lat: (e.target.getBounds().getNorth()), lng: (e.target.getBounds().getWest()) },
                        southWest: {lat: (e.target.getBounds().getSouth()), lng: (e.target.getBounds().getWest()) },
                        southEast: {lat: (e.target.getBounds().getSouth()), lng: (e.target.getBounds().getEast()) }
                    }
                );
            }
        },
        
    });

    return (
        <>
            <div className={classes["zoom-container"]}>
                <span>Zoom: {Math.round(getCurrentZoom)}</span> 
                {LeafletMap.getZoom() >= 15 && <span>Crime data available.</span>} 
                {LeafletMap.getZoom() < 15 && <span>Zoom to load crime data.</span>}
            </div>
            {getCurrentLocation !== undefined && <MapMarkers props={getCurrentLocation}/>}
        </>
    );
}

export default MapLocation;