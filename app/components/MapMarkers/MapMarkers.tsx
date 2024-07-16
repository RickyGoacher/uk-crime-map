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
        const delayDebounceFn = setTimeout(async ()=> {
            if (typeof window !== "undefined") {
                getTheData(props);
             }
          }, 2000);

          return () => clearTimeout(delayDebounceFn);
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

        const Cat = getCrimeInfo !== undefined && getCrimeInfo[index]['category'].replace(/_|-/g, " ");

        return (
        <Marker key={index} position={[item.lat, item.lng]} draggable={false}>
            <Popup>
                {getCrimeInfo !== undefined && Cat && <span><strong>Category:</strong> {Cat} </span>}
                {getCrimeInfo !== undefined && getCrimeInfo[index].location && <span><strong>Street:</strong> {getCrimeInfo[index].location.street.name} </span>}
                {getCrimeInfo !== undefined && getCrimeInfo[index].outcome_status && <span><strong>Outcome Status:</strong> {getCrimeInfo[index].outcome_status.category} </span>}
                {getCrimeInfo !== undefined && getCrimeInfo[index].outcome_status && <span><strong>Date:</strong> {getCrimeInfo[index].outcome_status.date}</span>}
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