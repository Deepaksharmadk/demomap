import React, { useState } from 'react';
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import Map from './Map';

export default function LocationMap() {
    const [open, setOpen] = useState(false);
    const [coords, setCoords] = useState({ lat: 0, lng: 0 });
    const [distance, setDistance] = useState(0);

    const handleToggleMap = () => {
        setOpen(!open);
    };

    const handleLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude, accuracy } = position.coords;
                setCoords({ lat: latitude, lng: longitude });
                setDistance(accuracy);
            });
        }
    };

    return (
        <div className="container mx-auto mt-20">
            <div className="relative flex items-center justify-center">
                <Button
                    className="bg-blue-500 text-white mr-4 hover:bg-blue-600"
                    onClick={handleLocation}
                >
                    Get Location
                </Button>
                <Button
                    className="bg-red-500 text-white hover:bg-red-600"
                    onClick={handleToggleMap}
                >
                    {open ? 'Hide Map' : 'Show Map'}
                </Button>
                {open && (
                    <Card className="absolute top-full right-0 mt-4 w-full max-w-3xl shadow-xl">
                        <CardContent className="p-0">
                            <div className="p-4 flex justify-between items-center">
                                <span className="text-sm">Accuracy: {distance.toFixed(2)} meters</span>
                                <Button
                                    className="bg-red-500 text-white hover:bg-red-600"
                                    onClick={handleToggleMap}
                                >
                                    Close Map
                                </Button>
                            </div>
                            <div className="h-[400px] w-full">
                                <Map coords={coords} />
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}

