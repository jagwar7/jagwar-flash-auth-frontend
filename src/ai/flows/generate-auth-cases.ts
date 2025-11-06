'use server';

/**
 * @fileOverview A flow for generating diverse authentication test cases using AI to demonstrate FlashAuth SDK capabilities.
 *
 * - generateAuthCases - A function that generates authentication test cases.
 * - GenerateAuthCasesInput - The input type for the generateAuthCases function (currently empty).
 * - GenerateAuthCasesOutput - The return type for the generateAuthCases function, containing the generated test cases.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAuthCasesInputSchema = z.object({});
export type GenerateAuthCasesInput = z.infer<typeof GenerateAuthCasesInputSchema>;

const GenerateAuthCasesOutputSchema = z.object({
  testCases: z.array(z.string()).describe('An array of authentication test cases.'),
});
export type GenerateAuthCasesOutput = z.infer<typeof GenerateAuthCasesOutputSchema>;

export async function generateAuthCases(input: GenerateAuthCasesInput): Promise<GenerateAuthCasesOutput> {
  return generateAuthCasesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateAuthCasesPrompt',
  input: {schema: GenerateAuthCasesInputSchema},
  output: {schema: GenerateAuthCasesOutputSchema},
  prompt: `You are an expert in authentication and security. Your task is to generate a diverse set of authentication test cases to demonstrate the capabilities of the FlashAuth SDK.

  The FlashAuth SDK aims to simplify authentication for React developers, eliminating the need to write custom authentication code.

  Consider various scenarios, including:
    - Successful login and logout
    - Handling expired sessions
    - User role management (e.g., admin, user)
    - Social logins (e.g., Google, Facebook)
    - Multi-factor authentication
    - Remember me functionality
    - Handling invalid credentials
    - Account recovery processes
    - Concurrent session management

  Each test case should be a clear and concise description of a specific authentication scenario.

  Return the test cases as an array of strings.
  `,
});

const generateAuthCasesFlow = ai.defineFlow(
  {
    name: 'generateAuthCasesFlow',
    inputSchema: GenerateAuthCasesInputSchema,
    outputSchema: GenerateAuthCasesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
