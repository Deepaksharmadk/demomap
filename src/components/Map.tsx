import { useEffect, useState } from 'react';
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
console.log(apiKey);

const libraries = ["places"];
const mapContainerStyle = {
    width: "100%",
    height: "100%",
};

interface MapProps {
    coords: { lat: number; lng: number };
}

export default function Map({ coords }: MapProps) {

    useEffect(() => {
        // In a real application, you would use a more secure method to handle API keys
    }, []);

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: apiKey,
        libraries,
    });

    if (loadError) {
        return <div className="text-red-500">Error loading maps</div>;
    }

    if (!isLoaded) {
        return <div className="text-gray-500">Loading maps...</div>;
    }

    return (
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={coords}
            zoom={14}
        >
            <Marker position={coords} />
        </GoogleMap>
    );
}

