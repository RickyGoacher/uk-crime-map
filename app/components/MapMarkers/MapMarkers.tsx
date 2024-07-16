'use client';

import { useState, useEffect } from "react";
import { Marker, Popup, useMap } from 'react-leaflet';
import {getCrimeData} from "@/api/police-data";
import { CrimeDataInterface, LocationInterface } from "@/app/App.types";
import classes from "@/app/components/MapMarkers/MapMarker.module.css";

interface PROPS {
    props: LocationInterface
}

function generateYearsBetween(startYear:number, endYear:number) {
    const endDate = endYear || new Date().getFullYear();
    let years = [];
  
    for (var i = startYear; i <= endDate; i++) {
      years.push(startYear);
      startYear++;
    }
    return years;
}

const Years = generateYearsBetween(2000, new Date().getFullYear()) || [];

const Months = [
    { num: '01', str: 'Jan'},
    { num: '02', str: 'Feb'},
    { num: '03', str: 'Mar'},
    { num: '04', str: 'Apr'},
    { num: '05', str: 'May'},
    { num: '06', str: 'Jun'},
    { num: '07', str: 'Jul'},
    { num: '08', str: 'Aug'},
    { num: '09', str: 'Sep'},
    { num: '10', str: 'Oct'},
    { num: '11', str: 'Nov'},
    { num: '12', str: 'Dec'}
];

const MapMarkers = ({props}:PROPS) => {

    const [getMarkerLocation, setMarkerLocation] = useState([{lat: 51.50735, lng: -0.12776}]);
    const [getCrimeInfo, setCrimeInfo] = useState<CrimeDataInterface[] | undefined>();
    const [getSelectedYearValue, setSelectedYearValue] = useState(2024);
    const [getSelectedMonthValue, setSelectedMonthValue] = useState('01');

    useEffect(() => {
        const delayDebounceFn = setTimeout(async ()=> {
            if (typeof window !== "undefined") {
                getTheData(props, getSelectedYearValue, getSelectedMonthValue);
             }
          }, 2000);

          return () => clearTimeout(delayDebounceFn);
    },[props]);

    async function getTheData (location:any, year:number, month:string) {
  
        let data = await getCrimeData(location, year, month);
        const Locations = data.map(item => {
            return {lat: Number(item.location.latitude), lng: Number(item.location.longitude)}
        });

        setCrimeInfo(data);
        setMarkerLocation(Locations);
    }

    function handleChange(e:any, state:any) {
        state(e.target.value);
    }

    const genYears = Years.map(item => {
        return <option key={item + Math.random()} value={item}>{item}</option>
    });

    const genMonths = Months.map(item => {
        return <option key={item.num + Math.random()} value={item.num}>{item.str}</option>
    });

    const genMarkers = getMarkerLocation.map((item, index) => {

        const Cat = getCrimeInfo !== undefined && getCrimeInfo[index]['category'].replace(/_|-/g, " ");

        return (
            <>
                <Marker key={index} position={[item.lat, item.lng]} draggable={false}>
                    <Popup>
                        {getCrimeInfo !== undefined && Cat && <span><strong>Category:</strong> {Cat} </span>}
                        {getCrimeInfo !== undefined && getCrimeInfo[index].location && <span><strong>Street:</strong> {getCrimeInfo[index].location.street.name} </span>}
                        {getCrimeInfo !== undefined && getCrimeInfo[index].outcome_status && <span><strong>Outcome Status:</strong> {getCrimeInfo[index].outcome_status.category} </span>}
                        {getCrimeInfo !== undefined && getCrimeInfo[index].outcome_status && <span><strong>Date:</strong> {getCrimeInfo[index].outcome_status.date}</span>}
                    </Popup>
                </Marker>
                <div className={classes["select-container"]}>
                    <select onChange={(e) => handleChange(e, setSelectedMonthValue)} value={getSelectedMonthValue}>
                        {genMonths}
                    </select>
                    <select onChange={(e) => handleChange(e, setSelectedYearValue)} value={getSelectedYearValue}>
                        {genYears}
                    </select>
                </div>
            </>
        );
    });

    return (
        <>
           {genMarkers}
        </>
    );
}  

export default MapMarkers;