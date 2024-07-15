'use client';

import { useMapEvents, useMap } from 'react-leaflet';
import MapMarkers from "../MapMarkers/MapMarkers";
import { useState, useEffect } from "react";
import { LocationInterface } from '@/app/App.types';

const MapLocation = () => {

    const LeafletMap = useMap();

    useEffect(() => {
        LeafletMap.locate().on("locationfound", function (e) {
            LeafletMap.locate();
        });
    }, [LeafletMap]);

    const [getCurrentLocation, setCurrentLocation] = useState<LocationInterface>();

    const map = useMapEvents({
    
        dragend(e) {
            setCurrentLocation(
                {
                    northEast: {lat: (e.target.getBounds().getNorth()), lng: (e.target.getBounds().getEast()) },
                    northWest: {lat: (e.target.getBounds().getNorth()), lng: (e.target.getBounds().getWest()) },
                    southWest: {lat: (e.target.getBounds().getSouth()), lng: (e.target.getBounds().getWest()) },
                    southEast: {lat: (e.target.getBounds().getSouth()), lng: (e.target.getBounds().getEast()) }
                }
            );
        },

        locationfound(e) {
            LeafletMap.flyTo(e.latlng, map.getZoom())
            setCurrentLocation(
                {
                    northEast: {lat: (e.target.getBounds().getNorth()), lng: (e.target.getBounds().getEast()) },
                    northWest: {lat: (e.target.getBounds().getNorth()), lng: (e.target.getBounds().getWest()) },
                    southWest: {lat: (e.target.getBounds().getSouth()), lng: (e.target.getBounds().getWest()) },
                    southEast: {lat: (e.target.getBounds().getSouth()), lng: (e.target.getBounds().getEast()) }
                }
            );
        },
    });

    return (
        getCurrentLocation !== undefined && <MapMarkers props={getCurrentLocation}/>
    );
}

export default MapLocation;