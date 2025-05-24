"use client";

import type React from 'react';
import { useEffect, useState } from 'react';
import type { Choice, GameResultOutcome } from '@/types';
import ChoiceIcon from './ChoiceIcon';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ResultDisplayProps {
  playerChoice: Choice | null;
  computerChoice: Choice | null;
  result: GameResultOutcome | null;
  isLoading: boolean;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ playerChoice, computerChoice, result, isLoading }) => {
  const [showComputerChoice, setShowComputerChoice] = useState(false);
  const [showResultText, setShowResultText] = useState(false);

  useEffect(() => {
    if (!isLoading && computerChoice) {
      const timer = setTimeout(() => {
        setShowComputerChoice(true);
      }, 100); // Short delay for computer choice reveal
      return () => clearTimeout(timer);
    }
    if (isLoading) {
      setShowComputerChoice(false);
      setShowResultText(false);
    }
  }, [isLoading, computerChoice]);

  useEffect(() => {
    if (showComputerChoice && result) {
      const timer = setTimeout(() => {
        setShowResultText(true);
      }, 500); // Delay for result text after computer choice
      return () => clearTimeout(timer);
    }
  }, [showComputerChoice, result]);


  const getResultText = () => {
    if (!result) return "";
    switch (result) {
      case 'win':
        return "You Win!";
      case 'lose':
        return "You Lose!";
      case 'draw':
        return "It's a Draw!";
      default:
        return "";
    }
  };

  const getResultColor = () => {
    if (!result) return "text-foreground";
    switch (result) {
      case 'win':
        return "text-green-500"; // Using a distinct green for win
      case 'lose':
        return "text-destructive";
      case 'draw':
        return "text-muted-foreground";
      default:
        return "text-foreground";
    }
  };

  if (!playerChoice && !isLoading) {
    return <p className="text-center text-xl font-semibold my-8">Choose your weapon!</p>;
  }
  
  return (
    <div className="my-8 p-6 min-h-[250px]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center text-center">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Your Choice</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center items-center h-24">
            {playerChoice && <ChoiceIcon choice={playerChoice} size={64} className="text-primary animate-revealChoice" />}
          </CardContent>
        </Card>

        <div className="flex flex-col items-center justify-center h-full">
          {isLoading && (
             <div className="text-center">
              <p className="text-lg font-semibold mb-2">Computer is thinking</p>
              <div className="flex justify-center items-center space-x-1">
                <div className="w-3 h-3 bg-primary rounded-full dot-1"></div>
                <div className="w-3 h-3 bg-primary rounded-full dot-2"></div>
                <div className="w-3 h-3 bg-primary rounded-full dot-3"></div>
              </div>
            </div>
          )}
          {!isLoading && result && showResultText && (
            <p className={`text-3xl font-bold animate-revealChoice ${getResultColor()}`}>
              {getResultText()}
            </p>
          )}
        </div>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Computer's Choice</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center items-center h-24">
            {isLoading && !computerChoice && <div className="text-muted-foreground text-2xl">?</div>}
            {!isLoading && computerChoice && showComputerChoice && (
              <ChoiceIcon choice={computerChoice} size={64} className="text-accent animate-revealChoice" />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResultDisplay;
