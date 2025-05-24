
"use client";

import type React from 'react';
import type { Choice } from '@/types';
import { Grab, Hand, ScissorsIcon as Scissors } from 'lucide-react'; // Changed HandRock to Grab

interface ChoiceIconProps {
  choice: Choice | null;
  size?: number;
  className?: string;
}

const ChoiceIcon: React.FC<ChoiceIconProps> = ({ choice, size = 48, className }) => {
  if (!choice) return null;

  const iconProps = { size, className };

  switch (choice) {
    case 'rock':
      return <Grab {...iconProps} aria-label="Rock" />; // Changed from HandRock to Grab
    case 'paper':
      return <Hand {...iconProps} aria-label="Paper" />;
    case 'scissors':
      return <Scissors {...iconProps} aria-label="Scissors" />;
    default:
      return null;
  }
};

export default ChoiceIcon;
