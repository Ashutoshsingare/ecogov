"use client";

import { useState } from "react";
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from "@vis.gl/react-google-maps";
import { facilities } from "@/lib/data";
import { Recycle, Zap, Factory } from "lucide-react";
import type { Facility } from "@/lib/types";

const getIcon = (type: Facility['type']) => {
  switch (type) {
    case "Recycling":
      return <Recycle className="h-5 w-5 text-white" />;
    case "WTE":
      return <Zap className="h-5 w-5 text-white" />;
    case "Biomethanation":
      return <Factory className="h-5 w-5 text-white" />;
    default:
      return null;
  }
};

const getPinColor = (type: Facility['type']) => {
    switch (type) {
      case "Recycling":
        return "#2563eb"; // blue-600
      case "WTE":
        return "#f59e0b"; // amber-500
      case "Biomethanation":
        return "#16a34a"; // green-600
      default:
        return "#6b7280"; // gray-500
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
              <Pin background={getPinColor(facility.type)} borderColor={getPinColor(facility.type)} glyph={getIcon(facility.type)} />
            </AdvancedMarker>
          ))}
          {selectedFacility && (
            <InfoWindow
              position={{ lat: selectedFacility.lat, lng: selectedFacility.lng }}
              onCloseClick={() => setSelectedFacility(null)}
            >
              <div>
                <h3 className="font-bold">{selectedFacility.name}</h3>
                <p className="text-sm">{selectedFacility.type} Plant</p>
              </div>
            </InfoWindow>
          )}
        </Map>
      </div>
    </APIProvider>
  );
}
