"use client";

import { useState, useRef } from "react";
import { APIProvider, Map, AdvancedMarker, InfoWindow, MapCameraProps } from "@vis.gl/react-google-maps";
import { facilities } from "@/lib/data";
import { Recycle, Zap, Factory } from "lucide-react";
import type { Facility } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import FacilityList from "./FacilityList";

const getIcon = (type: Facility['type']) => {
  switch (type) {
    case "Recycling":
      return <Recycle className="h-4 w-4 text-white" />;
    case "WTE":
      return <Zap className="h-4 w-4 text-white" />;
    case "Biomethanation":
      return <Factory className="h-4 w-4 text-white" />;
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

export default function FacilityMap() {
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const [cameraProps, setCameraProps] = useState<MapCameraProps>({
    center: { lat: 12.9716, lng: 77.5946 }, // Bangalore center
    zoom: 11,
  });

  if (!apiKey) {
    return <div className="flex items-center justify-center h-full bg-muted rounded-lg"><p>Google Maps API Key is missing.</p></div>;
  }

  const handleFacilitySelect = (facility: Facility) => {
    setSelectedFacility(facility);
    setCameraProps({
        center: { lat: facility.lat, lng: facility.lng },
        zoom: 14,
    });
  }

  return (
    <Card className="overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 min-h-[600px]">
            <div className="col-span-1 md:col-span-1 lg:col-span-1 bg-card border-r h-[300px] md:h-auto overflow-y-auto">
                <FacilityList 
                    facilities={facilities} 
                    onFacilitySelect={handleFacilitySelect}
                    selectedFacilityId={selectedFacility?.id}
                />
            </div>
            <div className="col-span-1 md:col-span-2 lg:col-span-3">
                <APIProvider apiKey={apiKey}>
                    <Map
                        {...cameraProps}
                        onCameraChanged={(ev) => setCameraProps(ev.detail)}
                        mapId="ecogov-facility-map"
                        gestureHandling={'greedy'}
                        disableDefaultUI={true}
                        className="w-full h-full"
                    >
                    {facilities.map((facility) => (
                        <AdvancedMarker
                            key={facility.id}
                            position={{ lat: facility.lat, lng: facility.lng }}
                            onClick={() => handleFacilitySelect(facility)}
                        >
                        <div className={cn("w-10 h-10 rounded-full flex items-center justify-center shadow-md cursor-pointer transition-transform duration-200", 
                            getPinColor(facility.type),
                            selectedFacility?.id === facility.id && "scale-125 z-10"
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
                        >
                        <div className="p-2">
                            <h3 className="font-bold text-lg">{selectedFacility.name}</h3>
                            <p className="text-sm text-muted-foreground">{selectedFacility.type} Plant</p>
                        </div>
                        </InfoWindow>
                    )}
                    </Map>
                </APIProvider>
            </div>
        </div>
    </Card>
  );
}
