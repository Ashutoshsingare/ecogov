"use client";

import { useState } from "react";
import { APIProvider, Map, AdvancedMarker, InfoWindow } from "@vis.gl/react-google-maps";
import { facilities } from "@/lib/data";
import { Recycle, Zap, Factory } from "lucide-react";
import type { Facility } from "@/lib/types";
import { cn } from "@/lib/utils";

const getIcon = (type: Facility['type']) => {
  switch (type) {
    case "Recycling":
      return <Recycle className="h-6 w-6 text-white" />;
    case "WTE":
      return <Zap className="h-6 w-6 text-white" />;
    case "Biomethanation":
      return <Factory className="h-6 w-6 text-white" />;
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
  const position = { lat: 12.9716, lng: 77.5946 }; // Bangalore center
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return <div className="flex items-center justify-center h-full bg-muted rounded-lg"><p>Google Maps API Key is missing.</p></div>;
  }

  return (
    <APIProvider apiKey={apiKey}>
      <div style={{ height: "600px", width: "100%" }}>
        <Map
          defaultCenter={position}
          defaultZoom={11}
          mapId="ecogov-facility-map"
          gestureHandling={'greedy'}
          disableDefaultUI={true}
        >
          {facilities.map((facility) => (
            <AdvancedMarker
              key={facility.id}
              position={{ lat: facility.lat, lng: facility.lng }}
              onClick={() => setSelectedFacility(facility)}
            >
              <div className={cn("w-10 h-10 rounded-full flex items-center justify-center shadow-md", getPinColor(facility.type))}>
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
      </div>
    </APIProvider>
  );
}
