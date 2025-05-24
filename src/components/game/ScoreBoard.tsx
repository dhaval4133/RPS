"use client";

import type React from 'react';
import type { Scores } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Frown, MinusSquare } from 'lucide-react';

interface ScoreBoardProps {
  scores: Scores;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ scores }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <Card className="shadow-lg border-primary">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Wins</CardTitle>
          <Trophy className="h-5 w-5 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-primary">{scores.wins}</div>
        </CardContent>
      </Card>
      <Card className="shadow-lg border-destructive">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Losses</CardTitle>
          <Frown className="h-5 w-5 text-destructive" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-destructive">{scores.losses}</div>
        </CardContent>
      </Card>
      <Card className="shadow-lg border-muted-foreground">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Draws</CardTitle>
          <MinusSquare className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-muted-foreground">{scores.draws}</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScoreBoard;
