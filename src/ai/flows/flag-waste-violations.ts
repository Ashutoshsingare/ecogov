'use server';

/**
 * @fileOverview This file defines a Genkit flow for flagging waste violations based on user-submitted reports.
 *
 * It includes:
 * - flagWasteViolations: The main function to analyze waste reports and identify potential violations.
 * - FlagWasteViolationsInput: The input type for the flagWasteViolations function.
 * - FlagWasteViolationsOutput: The output type for the flagWasteViolations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FlagWasteViolationsInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      'A photo of the waste report, as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' 
    ),
  description: z.string().describe('A description of the waste report.'),
});
export type FlagWasteViolationsInput = z.infer<typeof FlagWasteViolationsInputSchema>;

const FlagWasteViolationsOutputSchema = z.object({
  violationDetected: z
    .boolean()
    .describe('Whether a waste management violation is detected.'),
  violationType: z
    .string()
    .describe('The type of waste management violation detected, if any.'),
  confidenceScore: z
    .number()
    .describe(
      'A score between 0 and 1 indicating the confidence level of the violation detection.'
    ),
  explanation: z
    .string()
    .describe('Explanation of why the report was flagged as a violation.'),
});
export type FlagWasteViolationsOutput = z.infer<typeof FlagWasteViolationsOutputSchema>;

export async function flagWasteViolations(
  input: FlagWasteViolationsInput
): Promise<FlagWasteViolationsOutput> {
  return flagWasteViolationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'flagWasteViolationsPrompt',
  input: {schema: FlagWasteViolationsInputSchema},
  output: {schema: FlagWasteViolationsOutputSchema},
  prompt: `You are an AI assistant specializing in identifying waste management violations from user-submitted reports. Analyze the image and description to determine if a violation has occurred. Provide a confidence score (0-1) and explain your reasoning.

Description: {{{description}}}
Photo: {{media url=photoDataUri}}

Respond in JSON format.`,
});

const flagWasteViolationsFlow = ai.defineFlow(
  {
    name: 'flagWasteViolationsFlow',
    inputSchema: FlagWasteViolationsInputSchema,
    outputSchema: FlagWasteViolationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
