"use client";

import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";
import { vehicles } from "@/lib/data";
import { Truck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const statusColors = {
  active: "text-green-500",
  inactive: "text-gray-500",
  maintenance: "text-yellow-500",
};

export default function VehicleMap() {
  const position = { lat: 12.9716, lng: 77.5946 }; // Bangalore center
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Live Vehicle Map</CardTitle>
                <CardDescription>Real-time location of waste collection vehicles.</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center bg-muted rounded-lg">
                <p>Google Maps API Key is missing.</p>
            </CardContent>
        </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Live Vehicle Map</CardTitle>
        <CardDescription>Real-time location of waste collection vehicles.</CardDescription>
      </CardHeader>
      <CardContent>
        <APIProvider apiKey={apiKey}>
          <div style={{ height: "400px", width: "100%", borderRadius: "var(--radius)" }} className="overflow-hidden">
            <Map
              defaultCenter={position}
              defaultZoom={12}
              mapId="ecogov-vehicle-map"
              gestureHandling={'greedy'}
              disableDefaultUI={true}
            >
              {vehicles.map((vehicle) => (
                <AdvancedMarker key={vehicle.id} position={{ lat: vehicle.lat, lng: vehicle.lng }}>
                  <div className="relative">
                    <Truck className={cn("h-8 w-8 drop-shadow-lg", statusColors[vehicle.status])} />
                    <div className={cn(
                        "absolute -inset-1.5 -z-10 rounded-full animate-ping",
                        vehicle.status === 'active' ? 'bg-green-500/50' : '',
                    )}></div>
                  </div>
                </AdvancedMarker>
              ))}
            </Map>
          </div>
        </APIProvider>
      </CardContent>
    </Card>
  );
}
