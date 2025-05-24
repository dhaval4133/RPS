"use client";

import React, { useState, useEffect, useCallback } from 'react';
import type { Choice, GameResultOutcome, Scores } from '@/types';
import { getComputerChoice, determineWinner } from '@/lib/game-logic';
import ScoreBoard from './ScoreBoard';
import ChoiceArea from './ChoiceArea';
import ResultDisplay from './ResultDisplay';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

const RPSGame: React.FC = () => {
  const initialScores: Scores = { wins: 0, losses: 0, draws: 0 };
  const [scores, setScores] = useState<Scores>(initialScores);
  const [playerChoice, setPlayerChoice] = useState<Choice | null>(null);
  const [computerChoice, setComputerChoice] = useState<Choice | null>(null);
  const [result, setResult] = useState<GameResultOutcome | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [gameCount, setGameCount] = useState(0); // Used to trigger re-renders for animations

  // Load scores from localStorage on mount
  useEffect(() => {
    const savedScores = localStorage.getItem('rpsDuelScores');
    if (savedScores) {
      try {
        const parsedScores = JSON.parse(savedScores);
        // Basic validation
        if (typeof parsedScores.wins === 'number' &&
            typeof parsedScores.losses === 'number' &&
            typeof parsedScores.draws === 'number') {
          setScores(parsedScores);
        } else {
          localStorage.removeItem('rpsDuelScores'); // Clear invalid data
        }
      } catch (error) {
        console.error("Failed to parse scores from localStorage", error);
        localStorage.removeItem('rpsDuelScores'); // Clear corrupted data
      }
    }
  }, []);

  // Save scores to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('rpsDuelScores', JSON.stringify(scores));
  }, [scores]);

  const handlePlayerChoice = useCallback((choice: Choice) => {
    setIsLoading(true);
    setPlayerChoice(choice);
    setComputerChoice(null); // Clear previous computer choice
    setResult(null); // Clear previous result
    setGameCount(prev => prev + 1); // Increment game count for animation keying if needed

    setTimeout(() => {
      const compChoice = getComputerChoice();
      setComputerChoice(compChoice);
      
      const gameResult = determineWinner(choice, compChoice);
      setResult(gameResult);

      setScores((prevScores) => {
        const newScores = { ...prevScores };
        if (gameResult === 'win') newScores.wins += 1;
        else if (gameResult === 'lose') newScores.losses += 1;
        else newScores.draws += 1;
        return newScores;
      });
      
      setIsLoading(false);
    }, 1500); // Simulate computer thinking and allow animations
  }, []);

  const resetGame = () => {
    setScores(initialScores);
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult(null);
    setIsLoading(false);
    setGameCount(0);
    localStorage.removeItem('rpsDuelScores');
  };

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center min-h-screen">
      <header className="mb-10 text-center">
        <h1 className="text-5xl font-bold text-primary tracking-tight">RPS Duel</h1>
        <p className="text-muted-foreground mt-2 text-lg">Test your luck against the computer!</p>
      </header>

      <main className="w-full max-w-2xl bg-card p-6 md:p-8 rounded-xl shadow-2xl border">
        <ScoreBoard scores={scores} />
        
        <ChoiceArea onSelectChoice={handlePlayerChoice} disabled={isLoading} />

        <ResultDisplay
          key={gameCount} // Force re-render for animations
          playerChoice={playerChoice}
          computerChoice={computerChoice}
          result={result}
          isLoading={isLoading}
        />

        { (playerChoice || result) && !isLoading && (
            <div className="mt-8 text-center">
                <Button 
                    onClick={() => {
                        setPlayerChoice(null);
                        setComputerChoice(null);
                        setResult(null);
                    }}
                    variant="default"
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                    Play Again
                </Button>
            </div>
        )}
        
        <div className="mt-12 text-center">
            <Button onClick={resetGame} variant="outline" size="sm" className="text-muted-foreground hover:text-destructive hover:border-destructive">
                <RefreshCw className="mr-2 h-4 w-4" /> Reset Scores
            </Button>
        </div>
      </main>
      
    </div>
  );
};

export default RPSGame;
