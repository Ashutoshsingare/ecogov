"use client";

import { useState, useRef, useEffect } from "react";
import { APIProvider, Map, AdvancedMarker, InfoWindow, MapCameraProps, useMap } from "@vis.gl/react-google-maps";
import { facilities } from "@/lib/data";
import { Recycle, Zap, Factory, LocateFixed } from "lucide-react";
import type { Facility } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import FacilityList from "./FacilityList";
import Image from "next/image";
import { Loader2 } from "lucide-react";

const getIcon = (type: Facility['type'], size: 'sm' | 'lg' = 'sm') => {
    const className = size === 'sm' ? "h-4 w-4 text-white" : "h-5 w-5 text-white";
    switch (type) {
        case "Recycling":
        return <Recycle className={className} />;
        case "WTE":
        return <Zap className={className} />;
        case "Biomethanation":
        return <Factory className={className} />;
        default:
        return null;
    }
};

const getPinColor = (type: Facility['type']) => {
    switch (type) {
      case "Recycling":
        return "bg-blue-600";
      case "WTE":
        return "bg-amber-500";
      case "Biomethanation":
        return "bg-green-600";
      default:
        return "bg-gray-500";
    }
}

const facilityTypes: Facility['type'][] = ["Recycling", "WTE", "Biomethanation"];

function CurrentLocationButton() {
    const map = useMap();
    const [loading, setLoading] = useState(false);

    const handleLocateClick = () => {
        setLoading(true);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    if (map) {
                        map.moveCamera({ center: { lat: latitude, lng: longitude }, zoom: 13 });
                    }
                    setLoading(false);
                },
                () => {
                    alert("Could not get your location.");
                    setLoading(false);
                }
            );
        } else {
            alert("Geolocation is not supported by this browser.");
            setLoading(false);
        }
    };
    
    return (
        <Button onClick={handleLocateClick} variant="outline" size="icon" className="absolute bottom-4 right-4 bg-background shadow-lg" disabled={loading}>
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <LocateFixed className="h-5 w-5" />}
        </Button>
    )
}

export default function FacilityMap() {
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const [filter, setFilter] = useState<Facility['type'] | 'All'>('All');

  const [cameraProps, setCameraProps] = useState<MapCameraProps>({
    center: { lat: 12.9716, lng: 77.5946 }, // Bangalore center
    zoom: 11,
  });

  const filteredFacilities = facilities.filter(f => filter === 'All' || f.type === filter);

  useEffect(() => {
    if (selectedFacility && (filter !== 'All' && selectedFacility.type !== filter)) {
        setSelectedFacility(null);
    }
  }, [filter, selectedFacility]);

  if (!apiKey) {
    return <div className="flex items-center justify-center h-[600px] bg-muted rounded-lg"><p>Google Maps API Key is missing.</p></div>;
  }

  const handleFacilitySelect = (facility: Facility | null) => {
    if (facility) {
        setSelectedFacility(facility);
        setCameraProps({
            center: { lat: facility.lat, lng: facility.lng },
            zoom: 14,
        });
    } else {
        setSelectedFacility(null);
    }
  }

  return (
    <Card className="overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12 min-h-[70vh]">
            <div className="col-span-12 md:col-span-4 lg:col-span-3 bg-card border-r h-[400px] md:h-auto overflow-y-auto">
                <FacilityList 
                    facilities={filteredFacilities} 
                    onFacilitySelect={handleFacilitySelect}
                    selectedFacilityId={selectedFacility?.id}
                    filter={filter}
                    setFilter={setFilter}
                />
            </div>
            <div className="col-span-12 md:col-span-8 lg:col-span-9 relative">
                <APIProvider apiKey={apiKey}>
                    <Map
                        {...cameraProps}
                        onCameraChanged={(ev) => setCameraProps(ev.detail)}
                        mapId="ecogov-facility-map"
                        gestureHandling={'greedy'}
                        disableDefaultUI={true}
                        className="w-full h-full"
                    >
                    {filteredFacilities.map((facility) => (
                        <AdvancedMarker
                            key={facility.id}
                            position={{ lat: facility.lat, lng: facility.lng }}
                            onClick={() => handleFacilitySelect(facility)}
                        >
                        <div className={cn("w-10 h-10 rounded-full flex items-center justify-center shadow-md cursor-pointer transition-all duration-200", 
                            getPinColor(facility.type),
                            selectedFacility?.id === facility.id ? "scale-125 z-10" : "hover:scale-110"
                        )}>
                            {getIcon(facility.type)}
                        </div>
                        </AdvancedMarker>
                    ))}
                    {selectedFacility && (
                        <InfoWindow
                            position={{ lat: selectedFacility.lat, lng: selectedFacility.lng }}
                            onCloseClick={() => setSelectedFacility(null)}
                            pixelOffset={[0, -50]}
                            maxWidth={300}
                        >
                            <div className="p-1">
                                <Image 
                                    src={`https://picsum.photos/seed/${selectedFacility.id}/300/200`}
                                    alt={selectedFacility.name}
                                    width={300}
                                    height={200}
                                    className="rounded-md w-full aspect-video object-cover"
                                />
                                <h3 className="font-bold text-lg mt-2">{selectedFacility.name}</h3>
                                <p className="text-sm text-muted-foreground">{selectedFacility.type} Plant</p>
                                <Button size="sm" asChild className="mt-4 w-full">
                                    <a 
                                        href={`https://www.google.com/maps/dir/?api=1&destination=${selectedFacility.lat},${selectedFacility.lng}`} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                    >
                                        Get Directions
                                    </a>
                                </Button>
                            </div>
                        </InfoWindow>
                    )}
                    </Map>
                    <CurrentLocationButton />
                </APIProvider>
            </div>
        </div>
    </Card>
  );
}
