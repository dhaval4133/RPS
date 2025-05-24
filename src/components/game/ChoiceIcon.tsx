
"use client";

import type React from 'react';
import type { Choice } from '@/types';
import { Gem, Hand, ScissorsIcon as Scissors } from 'lucide-react'; // Changed Fist to Gem

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
      return <Gem {...iconProps} aria-label="Rock" />; // Changed from Fist to Gem
    case 'paper':
      return <Hand {...iconProps} aria-label="Paper" />;
    case 'scissors':
      return <Scissors {...iconProps} aria-label="Scissors" />;
    default:
      return null;
  }
};

export default ChoiceIcon;
