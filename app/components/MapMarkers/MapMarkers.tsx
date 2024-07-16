'use client';

import { useState, useEffect } from "react";
import { Marker, Popup } from 'react-leaflet';
import {getCrimeData} from "@/api/police-data";
import { CrimeDataInterface, LocationInterface } from "@/app/App.types";

interface PROPS {
    props: LocationInterface
}

const MapMarkers = ({props}:PROPS) => {

    const [getMarkerLocation, setMarkerLocation] = useState([{lat: 51.50735, lng: -0.12776}]);
    const [getCrimeInfo, setCrimeInfo] = useState<CrimeDataInterface[] | undefined>();

    useEffect(() => {
        if (typeof window !== "undefined") {
           getTheData(props);
        }
    },[props])

    async function getTheData (location:any) {
  
        let data = await getCrimeData(location);
        const Locations = data.map(item => {
            return {lat: Number(item.location.latitude), lng: Number(item.location.longitude)}
        });

        setCrimeInfo(data);
        setMarkerLocation(Locations);
    }

    const genMarkers = getMarkerLocation.map((item, index) => {
        return (
        <Marker key={index} position={[item.lat, item.lng]} draggable={false}>
            <Popup>
                {getCrimeInfo !== undefined && getCrimeInfo[index]['category'] && <span>Category: {getCrimeInfo[index]['category']} </span>}
                {getCrimeInfo !== undefined && getCrimeInfo[index].location && <span>Street: {getCrimeInfo[index].location.street.name} </span>}
                {getCrimeInfo !== undefined && getCrimeInfo[index].outcome_status && <span>Outcome Status: {getCrimeInfo[index].outcome_status.category} </span>}
                {getCrimeInfo !== undefined && getCrimeInfo[index].outcome_status && <span>{getCrimeInfo[index].outcome_status.date}</span>}
            </Popup>
        </Marker>
        );
    });

    return (
        <>
           {genMarkers}
        </>
    );
}  

export default MapMarkers;