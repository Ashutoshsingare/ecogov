"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { MapPin, Loader2, CheckCircle, AlertTriangle, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormControl, FormField, FormItem, FormMessage, Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  wasteType: z.string().min(1, "Please select a waste type."),
  location: z.string().min(5, "Please provide a valid location or address."),
  name: z.string().min(2, "Name is too short."),
  phoneNumber: z.string().min(10, "Please enter a valid phone number."),
});

type FormData = z.infer<typeof formSchema>;

const wasteTypes = [
    "Dry Waste (Paper, Plastic, Metal, Glass)",
    "Wet Waste (Kitchen, Food, Garden)",
    "Hazardous Waste (Batteries, Paint, E-waste)",
];

export default function RecycleForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      wasteType: "",
      location: "",
      name: "",
      phoneNumber: "",
    }
  });

  const { setValue, control, handleSubmit } = form;

  const onFormSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    console.log("Scheduling pickup:", data);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    toast({
        title: "Pickup Scheduled!",
        description: "Our team will contact you shortly to confirm the details.",
    });
    form.reset();
  };
  
  const handleGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setValue("location", `Lat: ${latitude.toFixed(5)}, Lng: ${longitude.toFixed(5)}`, { shouldValidate: true });
        },
        () => {
          toast({
            variant: "destructive",
            title: "Geolocation Failed",
            description: "Could not get your location. Please enter it manually.",
          });
        }
      );
    }
  };

  return (
    <>
      <div className="w-full max-w-2xl mx-auto space-y-8">
        <Card>
            <CardContent className="p-6">
            <Form {...form}>
            <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">

                <FormField
                  control={control}
                  name="wasteType"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="wasteType" className="font-medium">Type of Waste *</Label>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger id="wasteType">
                            <SelectValue placeholder="Select type of waste" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {wasteTypes.map(type => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="location" className="font-medium">Pickup Address / Location *</Label>
                      <div className="flex items-center gap-2 mt-2">
                        <FormControl>
                            <Input
                                id="location"
                                {...field}
                                placeholder="Enter your full address or detect location"
                            />
                        </FormControl>
                        <Button type="button" variant="outline" onClick={handleGeolocation} className="shrink-0">
                            <MapPin className="mr-2 h-4 w-4" />
                            Detect
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <Label htmlFor="name" className="font-medium">Your Name *</Label>
                          <FormControl>
                            <Input id="name" {...field} placeholder="e.g. John Doe" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <Label htmlFor="phoneNumber" className="font-medium">Phone Number *</Label>
                          <FormControl>
                            <Input id="phoneNumber" {...field} placeholder="e.g. +91 98765 43210" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isSubmitting ? "Scheduling..." : "Schedule Pickup"}
                </Button>
            </form>
            </Form>
            </CardContent>
        </Card>

        <Alert>
            <Lightbulb className="h-4 w-4" />
            <AlertTitle>Before You Schedule</AlertTitle>
            <AlertDescription>
                <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1 mt-2">
                    <li>Ensure your waste is properly segregated into wet, dry, and hazardous categories.</li>
                    <li>Keep at least 5kg of waste ready for a viable pickup.</li>
                    <li>Our team will call you to confirm the pickup time and date.</li>
                </ul>
            </AlertDescription>
        </Alert>
      </div>
    </>
  );
}
