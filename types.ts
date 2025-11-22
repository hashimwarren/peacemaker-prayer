import { z } from 'zod';

export const GroundingChunkSchema = z.object({
  web: z.object({
    uri: z.string(),
    title: z.string(),
  }).optional(),
});

export const GenerationResultSchema = z.object({
  newsItems: z.array(z.string()),
  prayer: z.string(),
  groundingChunks: z.array(GroundingChunkSchema),
});

export type GroundingChunk = z.infer<typeof GroundingChunkSchema>;
export type GenerationResult = z.infer<typeof GenerationResultSchema>;

export enum AppState {
  IDLE = 'IDLE',
  GENERATING = 'GENERATING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}