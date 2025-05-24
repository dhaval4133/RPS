import type { Choice, GameResultOutcome } from '@/types';
import { CHOICES } from '@/types';

export function getComputerChoice(): Choice {
  const randomIndex = Math.floor(Math.random() * CHOICES.length);
  return CHOICES[randomIndex];
}

export function determineWinner(playerChoice: Choice, computerChoice: Choice): GameResultOutcome {
  if (playerChoice === computerChoice) {
    return 'draw';
  }
  if (
    (playerChoice === 'rock' && computerChoice === 'scissors') ||
    (playerChoice === 'scissors' && computerChoice === 'paper') ||
    (playerChoice === 'paper' && computerChoice === 'rock')
  ) {
    return 'win';
  }
  return 'lose';
}
