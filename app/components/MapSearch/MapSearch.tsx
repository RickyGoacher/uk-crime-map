'use client';

import { useMap } from 'react-leaflet'
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import { useEffect } from 'react';

const MapSearch = () => {

    const leafletMap = useMap() // access to leaflet map

    useEffect(() => {

        const provider = new OpenStreetMapProvider();

        const searchControl:any = new GeoSearchControl({provider});

        leafletMap.addControl(searchControl) // this is how you add a control in vanilla leaflet

        return () => leafletMap.removeControl(searchControl)
        
    }, []);

    return null // don't want anything to show up from this comp

}

export default MapSearch;