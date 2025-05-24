"use client";

import type React from 'react';
import type { Choice } from '@/types';
import { CHOICES } from '@/types';
import ChoiceButton from './ChoiceButton';

interface ChoiceAreaProps {
  onSelectChoice: (choice: Choice) => void;
  disabled: boolean;
}

const ChoiceArea: React.FC<ChoiceAreaProps> = ({ onSelectChoice, disabled }) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold text-center mb-6">Make Your Choice</h2>
      <div className="flex justify-center items-center gap-4 md:gap-8">
        {CHOICES.map((choice) => (
          <ChoiceButton
            key={choice}
            choice={choice}
            onSelect={onSelectChoice}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
};

export default ChoiceArea;
