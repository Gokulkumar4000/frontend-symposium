// SubmitButton.tsx
import React from 'react';

interface SubmitButtonProps {
  onClick: () => void;
  isSubmitted: boolean;
  disabled: boolean; // Add the 'disabled' prop to the interface
  isLoading: boolean; // Add the 'disabled' prop to the interface
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ onClick, isSubmitted, disabled,isLoading }) => {
  return (
    <>
      {!isSubmitted && (
        <button
          onClick={onClick}
          disabled={disabled} // Disable the button when the 'disabled' prop is true
          className={`mt-3 text-white px-4 py-2 rounded-lg cursor-pointer text-center ${
            disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500'
          }`}
        >
          {isLoading ? 'Submitting...' : isSubmitted ? 'Submitted!' : 'Submit'}
        </button>
      )}
      {isSubmitted && (
        <p className="mt-2 text-green-500 text-center">Payment proof submitted successfully!</p>
      )}
    </>
  );
};

export default SubmitButton;
