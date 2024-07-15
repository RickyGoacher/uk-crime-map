"use server";

import { CrimeDataInterface } from "@/app/App.types";

export const getCrimeData = async (location:any) => {
    console.log(location, 'dxwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww')
    const NorthEastLat = location.northEast.lat;
    const NorthEastLng = location.northEast.lng;
    const SouthWestLat = location.southWest.lat;
    const SouthWestLng = location.southWest.lng;
    const NorthWestLat = location.northWest.lat;
    const NorthWestLng = location.northWest.lng;

    const requestBuilt = NorthEastLat + ',' + NorthEastLng + ':' + NorthWestLat + ',' + NorthWestLng + ':' + SouthWestLat + ',' + SouthWestLng 

    console.log(`https://data.police.uk/api/crimes-street/all-crime?poly=${requestBuilt}`)

    const response = await fetch(`https://data.police.uk/api/crimes-street/all-crime?poly=${requestBuilt}`); 
    const data:Array<CrimeDataInterface> = await response.json();
    console.log(data, 'the data')
    return data;
}