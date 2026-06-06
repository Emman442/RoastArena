'use server';
/**
 * @fileOverview An AI judge agent for evaluating roast submissions in the RoastArena platform.
 *
 * - aiRoastEvaluation - A function that evaluates a roast based on humor, creativity, savagery, and other metrics.
 * - AiRoastEvaluationInput - The input type for the aiRoastEvaluation function.
 * - AiRoastEvaluationOutput - The return type for the aiRoastEvaluation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiRoastEvaluationInputSchema = z.object({
  roastText: z.string().describe('The roast text submitted by the participant.'),
  challengePrompt: z.string().describe('The prompt of the roast challenge.'),
});
export type AiRoastEvaluationInput = z.infer<typeof AiRoastEvaluationInputSchema>;

const AiRoastEvaluationOutputSchema = z.object({
  humor: z
    .number()
    .min(0)
    .max(100)
    .describe('Score for how humorous and funny the roast is (0-100).'),
  creativity: z
    .number()
    .min(0)
    .max(100)
    .describe('Score for the originality and inventiveness of the roast (0-100).'),
  originality: z
    .number()
    .min(0)
    .max(100)
    .describe('Score for how unique and non-derivative the roast is (0-100).'),
  savagery: z
    .number()
    .min(0)
    .max(100)
    .describe('Score for how cutting, biting, and ruthless the roast is, while remaining witty (0-100).'),
  relevance: z
    .number()
    .min(0)
    .max(100)
    .describe('Score for how well the roast adheres to and references the challenge prompt (0-100).'),
  viralityPotential: z
    .number()
    .min(0)
    .max(100)
    .describe('Score for the likelihood of the roast becoming popular or widely shared (0-100).'),
  overallScore: z
    .number()
    .min(0)
    .max(100)
    .describe('An aggregate score representing the overall quality of the roast (0-100).'),
  reasoning: z
    .string()
    .describe('A detailed explanation justifying the scores given for each category.'),
});
export type AiRoastEvaluationOutput = z.infer<typeof AiRoastEvaluationOutputSchema>;

export async function aiRoastEvaluation(
  input: AiRoastEvaluationInput
): Promise<AiRoastEvaluationOutput> {
  return aiRoastEvaluationFlow(input);
}

const aiRoastEvaluationPrompt = ai.definePrompt({
  name: 'aiRoastEvaluationPrompt',
  input: {schema: AiRoastEvaluationInputSchema},
  output: {schema: AiRoastEvaluationOutputSchema},
  prompt: `You are an AI Judge for RoastArena, a competitive platform for roast challenges. Your task is to evaluate a submitted roast against a given challenge prompt.

Assess the submitted roast based on the following criteria, providing a score from 0 to 100 for each. Ensure your output strictly adheres to the JSON schema provided. Also, include a detailed reasoning for all your scores.

Challenge Prompt: """{{{challengePrompt}}}"""

Roast Submission: """{{{roastText}}}"""

Consider the following definitions for scoring:
- Humor: How genuinely funny, witty, and clever the roast is. Does it make people laugh?
- Creativity: How original and inventive the roast's approach or premise is. Is it unique?
- Originality: How distinct and non-derivative the roast is from common jokes or tropes. Does it stand out?
- Savagery: How cutting, biting, and ruthless the roast is, without being overly offensive or crossing lines into pure malice. It should be witty and sharp.
- Relevance: How well the roast stays on topic and directly addresses the challenge prompt.
- Virality Potential: How likely the roast is to be widely shared, quoted, or become a meme due to its impact.
- Overall Score: A balanced aggregate of all the above scores, reflecting the roast's total quality.

Provide your evaluation as a JSON object, including all the defined scores and a comprehensive reasoning.`,
});

const aiRoastEvaluationFlow = ai.defineFlow(
  {
    name: 'aiRoastEvaluationFlow',
    inputSchema: AiRoastEvaluationInputSchema,
    outputSchema: AiRoastEvaluationOutputSchema,
  },
  async input => {
    const {output} = await aiRoastEvaluationPrompt(input);
    return output!;
  }
);
