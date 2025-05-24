export const CHOICES = ['rock', 'paper', 'scissors'] as const;
export type Choice = typeof CHOICES[number];

export type GameResultOutcome = 'win' | 'lose' | 'draw';

export interface Scores {
  wins: number;
  losses: number;
  draws: number;
}
