"use server";

import { z } from "zod";
import { flagWasteViolations } from "@/ai/flows/flag-waste-violations";

const wasteReportSchema = z.object({
  issueType: z.string().min(1, "Please select an issue type."),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  photoDataUri: z.string().startsWith("data:image/", { message: "Invalid image format." }),
  location: z.string().optional(),
  name: z.string().min(2, "Name is too short."),
  phoneNumber: z.string().min(10, "Please enter a valid phone number."),
});

export type FormState = {
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
  data?: any;
};

export async function handleWasteReport(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  
  const validatedFields = wasteReportSchema.safeParse({
    issueType: formData.get("issueType"),
    description: formData.get("description"),
    photoDataUri: formData.get("photoDataUri"),
    location: formData.get("location"),
    name: formData.get("name"),
    phoneNumber: formData.get("phoneNumber"),
  });

  if (!validatedFields.success) {
    const issues = validatedFields.error.issues.map((issue) => issue.message);
    return {
      message: "Error: Invalid form data.",
      issues,
    };
  }

  try {
    const result = await flagWasteViolations({
      description: validatedFields.data.description,
      photoDataUri: validatedFields.data.photoDataUri,
    });
    
    // In a real app, you would save the full report (including name, phone, etc.) 
    // and the AI result to a database here.

    return {
      message: "Success! Report submitted and analyzed.",
      data: result,
    };
  } catch (error) {
    console.error("Error calling GenAI flow:", error);
    return {
      message: "An error occurred while analyzing the report. Please try again.",
    };
  }
}
