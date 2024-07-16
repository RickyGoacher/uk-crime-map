'use client';

import { useMap } from 'react-leaflet'
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import { useEffect } from 'react';

const MapSearch = () => {

    const leafletMap = useMap()

    useEffect(() => {

        const provider = new OpenStreetMapProvider();

        const searchControl:any = new GeoSearchControl({provider});

        leafletMap.addControl(searchControl);

        return () => {leafletMap.removeControl(searchControl)}
        
    }, []);

    return null;

}

export default MapSearch;