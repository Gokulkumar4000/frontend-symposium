// ProceedButton.tsx
import React from 'react';

interface ProceedButtonProps {
  disabled: boolean;
  onClick: () => Promise<void>; // Add this line to accept onClick prop
}

const ProceedButton: React.FC<ProceedButtonProps> = ({ disabled, onClick }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-5 ${
        disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#2884e6] text-white'
      } text-base font-bold leading-normal tracking-[0.015em] grow`}
    >
      <span className="truncate">Proceed to Pay ₹150</span>
    </button>
  );
};

export default ProceedButton;
