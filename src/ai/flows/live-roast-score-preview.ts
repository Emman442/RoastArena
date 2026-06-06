'use server';
/**
 * @fileOverview A Genkit flow for providing a live score preview of a roast.
 *
 * - liveRoastScorePreview - A function that evaluates a roast for humor, savagery, creativity, and more.
 * - LiveRoastScorePreviewInput - The input type for the liveRoastScorePreview function.
 * - LiveRoastScorePreviewOutput - The return type for the liveRoastScorePreview function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const LiveRoastScorePreviewInputSchema = z.object({
  roastText: z.string().describe('The roast text to be evaluated.'),
});
export type LiveRoastScorePreviewInput = z.infer<typeof LiveRoastScorePreviewInputSchema>;

const LiveRoastScorePreviewOutputSchema = z.object({
  humor: z.number().min(0).max(100).describe('The humor score for the roast (0-100).'),
  creativity: z.number().min(0).max(100).describe('The creativity score for the roast (0-100).'),
  originality: z.number().min(0).max(100).describe('The originality score for the roast (0-100).'),
  savagery: z.number().min(0).max(100).describe('The savagery score for the roast (0-100).'),
  relevance: z
    .number()
    .min(0)
    .max(100)
    .describe('The relevance score for the roast to common roast themes (0-100).'),
  viralityPotential: z
    .number()
    .min(0)
    .max(100)
    .describe('The virality potential score for the roast (0-100).'),
  overallScore: z
    .number()
    .min(0)
    .max(100)
    .describe('The overall score for the roast (0-100), calculated as an average of the other metrics.'),
  aiReasoning: z.string().describe('The AI reasoning for the given scores and overall evaluation.'),
});
export type LiveRoastScorePreviewOutput = z.infer<typeof LiveRoastScorePreviewOutputSchema>;

export async function liveRoastScorePreview(
  input: LiveRoastScorePreviewInput
): Promise<LiveRoastScorePreviewOutput> {
  return liveRoastScorePreviewFlow(input);
}

const prompt = ai.definePrompt({
  name: 'liveRoastScorePreviewPrompt',
  input: {schema: LiveRoastScorePreviewInputSchema},
  output: {schema: LiveRoastScorePreviewOutputSchema},
  prompt: `You are an expert AI Judge for RoastArena, a competitive platform where users submit roasts. Your task is to evaluate the provided roast text based on the following metrics, scoring each from 0 to 100:

1.  **Humor**: How funny and witty is the roast?
2.  **Creativity**: How original and imaginative is the roast? Does it use unexpected angles or clever wordplay?
3.  **Originality**: How unique is the roast? Does it avoid common tropes and deliver fresh perspectives?
4.  **Savagery**: How cutting and impactful is the roast? Does it hit hard without being overtly offensive (unless contextually appropriate for a roast)?
5.  **Relevance**: How relevant is the roast to general tech/startup/crypto roasting themes? (For this live preview, focus on general roast themes)
6.  **Virality Potential**: How likely is this roast to be shared widely and gain traction on social media?

Based on these individual scores, calculate an 'overallScore' as an average.
Finally, provide detailed 'aiReasoning' explaining your scores and overall evaluation.

The roast to evaluate is:
{{{roastText}}}`,
});

const liveRoastScorePreviewFlow = ai.defineFlow(
  {
    name: 'liveRoastScorePreviewFlow',
    inputSchema: LiveRoastScorePreviewInputSchema,
    outputSchema: LiveRoastScorePreviewOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
