"use server";

import { z } from "zod";
import { flagWasteViolations } from "@/ai/flows/flag-waste-violations";

const wasteReportSchema = z.object({
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  photoDataUri: z.string().startsWith("data:image/", { message: "Invalid image format." }),
  location: z.string().optional(),
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
    description: formData.get("description"),
    photoDataUri: formData.get("photoDataUri"),
    location: formData.get("location"),
  });

  if (!validatedFields.success) {
    const issues = validatedFields.error.issues.map((issue) => issue.message);
    return {
      message: "Error: Invalid form data.",
      issues,
    };
  }

  try {
    const result = await flagWasteViolations(validatedFields.data);
    
    // In a real app, you would save the report and the AI result to a database here.

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
