'use client';

import { useMapEvents } from 'react-leaflet';
import MapMarkers from "../MapMarkers/MapMarkers";
import { useState } from "react";


const MapLocation = () => {

    const [getCurrentLocation, setCurrentLocation] = useState(
        {
        northEast: {
            lat: 52.63368799170261,
            lng: -1.1490345600957186
        }, 
        southWest: {
            lat: 52.63206010557883,
            lng: -1.1530793312901768
        },
        center: {
            lat: 52.932874048640716,
            lng: -1.5510569456929476
        }
    });

    const map = useMapEvents({

        click(e) {
            console.log(e.latlng);
        },
    
        dragend(e) {
            setCurrentLocation(
                {
                    northEast: {lat: (e.target.getBounds().getNorth()), lng: (e.target.getBounds().getEast()) },
                    southWest: {lat: (e.target.getBounds().getNorth()), lng: (e.target.getBounds().getWest()) },
                    center: {lat: (e.target.getBounds().getSouth()), lng: (e.target.getBounds().getWest()) }
                }
            );
        },
        locationfound(e) {
          console.log(e, 'the E');
        },
      });

      return (
        <MapMarkers props={getCurrentLocation}/>
      );
}

export default MapLocation;