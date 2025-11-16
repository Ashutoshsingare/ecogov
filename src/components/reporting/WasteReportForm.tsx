"use client";

import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { MapPin, UploadCloud, X, Loader2, CheckCircle, AlertTriangle, Lightbulb } from "lucide-react";
import { handleWasteReport, type FormState } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Form } from "@/components/ui/form";


const formSchema = z.object({
  issueType: z.string().min(1, "Please select an issue type."),
  description: z.string().min(10, "Description is too short."),
  photo: z.instanceof(File).refine(file => file.size > 0, "A photo is required."),
  location: z.string().optional(),
  name: z.string().min(2, "Name is too short."),
  phoneNumber: z.string().min(10, "Please enter a valid phone number."),
});

type FormData = z.infer<typeof formSchema>;

const issueTypes = [
    "Illegal Dumping",
    "Improper Segregation",
    "Uncovered Waste",
    "Overflowing Bins",
    "Hazardous Waste",
    "Burning Waste",
    "Other",
];

export default function WasteReportForm() {
  const [formState, formAction] = useFormState<FormState, globalThis.FormData>(handleWasteReport, {
    message: "",
  });
  
  const [preview, setPreview] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      location: "",
      name: "",
      phoneNumber: "",
      issueType: "",
      photo: new File([], ""),
    }
  });

  const { register, handleSubmit, setValue, watch, control, formState: { errors } } = form;

  const photoFile = watch("photo");

  useEffect(() => {
    if (!photoFile || photoFile.size === 0) {
      setPreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(photoFile);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [photoFile]);
  
  useEffect(() => {
    if (formState.message) {
      setIsSubmitting(false);
      setIsDialogOpen(true);
    }
  }, [formState]);

  const onFormSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    const reader = new FileReader();
    reader.readAsDataURL(data.photo);
    reader.onloadend = () => {
      const formData = new globalThis.FormData();
      formData.append("description", data.description);
      formData.append("photoDataUri", reader.result as string);
      formData.append("location", data.location || "");
      formData.append("issueType", data.issueType);
      formData.append("name", data.name);
      formData.append("phoneNumber", data.phoneNumber);
      formAction(formData);
    };
  };
  
  const handleFileChange = (files: FileList | null) => {
    if (files && files[0]) {
      setValue("photo", files[0], { shouldValidate: true });
    }
  };
  
  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    handleFileChange(e.dataTransfer.files);
  };
  
  const handleGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setValue("location", `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`);
      });
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
                  name="issueType"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="issueType" className="font-medium">Type of Issue *</Label>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger id="issueType">
                            <SelectValue placeholder="Select type of issue" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {issueTypes.map(type => (
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
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="description" className="font-medium">Description *</Label>
                      <FormControl>
                        <Textarea
                          id="description"
                          {...field}
                          placeholder="Describe the waste issue in detail..."
                          className="mt-2 min-h-[120px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="location" className="font-medium">Location</Label>
                      <div className="flex items-center gap-2 mt-2">
                        <FormControl>
                            <Input
                                id="location"
                                {...field}
                                placeholder="e.g., New Delhi, India"
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

                <div>
                  <Label htmlFor="photo" className="mb-2 block font-medium">Photo Evidence *</Label>
                  <label
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-card hover:bg-muted/50 transition-colors"
                  >
                    {preview ? (
                      <div className="relative w-full h-full">
                        <Image src={preview} alt="Preview" fill style={{ objectFit: 'contain' }} className="rounded-lg" />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2 h-8 w-8"
                          onClick={() => setValue("photo", new File([], ""), { shouldValidate: true })}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <UploadCloud className="w-10 h-10 mb-3 text-muted-foreground" />
                        <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-muted-foreground">PNG, JPG, up to 10MB</p>
                      </div>
                    )}
                  </label>
                  <input
                    id="photo"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={(e) => handleFileChange(e.target.files)}
                  />
                  {errors.photo && <p className="text-sm text-destructive mt-2">{errors.photo.message as string}</p>}
                   <p className="text-xs text-muted-foreground mt-2">ⓘ Photo helps us verify and address the issue faster.</p>
                </div>

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
                  {isSubmitting ? "Submitting..." : "Submit Report"}
                </Button>
            </form>
            </Form>
            </CardContent>
        </Card>

        <Alert>
            <Lightbulb className="h-4 w-4" />
            <AlertTitle>Tips for Better Reports</AlertTitle>
            <AlertDescription>
                <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1 mt-2">
                    <li>Take clear, well-lit photos showing the issue.</li>
                    <li>Include landmarks or street signs for better location accuracy.</li>
                    <li>Provide detailed descriptions to help authorities respond quickly.</li>
                    <li>Report immediately after spotting the issue.</li>
                </ul>
            </AlertDescription>
        </Alert>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {formState.data ? <CheckCircle className="text-green-500" /> : <AlertTriangle className="text-red-500" />}
              Report Analysis
            </DialogTitle>
            <DialogDescription>
              {formState.message}
            </DialogDescription>
          </DialogHeader>
          {formState.data && (
            <div className="space-y-4 text-sm">
                <p><strong>Violation Detected:</strong> <Badge variant={formState.data.violationDetected ? "destructive" : "secondary"}>{formState.data.violationDetected ? 'Yes' : 'No'}</Badge></p>
                {formState.data.violationDetected && <p><strong>Violation Type:</strong> {formState.data.violationType}</p>}
                <p><strong>Confidence Score:</strong> {(formState.data.confidenceScore * 100).toFixed(1)}%</p>
                <p className="p-3 bg-muted/50 rounded-md"><strong>AI Explanation:</strong> <em>{formState.data.explanation}</em></p>
            </div>
          )}
          {formState.issues && (
             <div className="p-3 bg-destructive/10 rounded-md text-destructive text-sm">
                <ul>
                    {formState.issues.map(issue => <li key={issue}>- {issue}</li>)}
                </ul>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
