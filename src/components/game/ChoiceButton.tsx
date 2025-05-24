"use client";

import type React from 'react';
import type { Choice } from '@/types';
import { Button } from '@/components/ui/button';
import ChoiceIcon from './ChoiceIcon';

interface ChoiceButtonProps {
  choice: Choice;
  onSelect: (choice: Choice) => void;
  disabled?: boolean;
}

const ChoiceButton: React.FC<ChoiceButtonProps> = ({ choice, onSelect, disabled }) => {
  const choiceText = choice.charAt(0).toUpperCase() + choice.slice(1);

  return (
    <Button
      variant="outline"
      size="lg"
      className="flex flex-col items-center justify-center h-32 w-32 p-4 shadow-md hover:shadow-lg transition-shadow duration-200 transform hover:scale-105 focus:ring-accent focus:ring-2"
      onClick={() => onSelect(choice)}
      disabled={disabled}
      aria-label={`Select ${choiceText}`}
    >
      <ChoiceIcon choice={choice} size={40} className="mb-2 text-primary" />
      <span className="text-lg font-semibold">{choiceText}</span>
    </Button>
  );
};

export default ChoiceButton;
