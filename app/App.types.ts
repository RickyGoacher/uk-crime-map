export interface CrimeDataInterface {
    categroy: string;
    location_type: string;
    location: {
        latitude: string;
        street: {
            name: string;
        };
        longitude: string;
    }
    context: string;
    outcome_status: {
        category: string;
        date: string;
    }
    persistent_id: string;
    id: number;
    location_subtype: string;
    month: string;
}

export interface LocationInterface {
    northEast: {
        lat: number;
        lng: number;
    }
    northWest: {
        lat: number;
        lng: number;
    }
    southWest: {
        lat: number;
        lng: number;
    }
    southEast: {
        lat: number;
        lng: number;
    }
}