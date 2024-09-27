"use client";

import React from 'react';

interface FormInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Add onChange prop
}

const FormInput: React.FC<FormInputProps> = ({ label, placeholder, value, onChange }) => {
  return (
    <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
      <label className="flex flex-col min-w-40 flex-1">
        <p className="text-[#111418] text-base font-medium leading-normal pb-2">
          {label}
        </p>
        <input
          placeholder={placeholder}
          value={value}
          type="email"
          onChange={onChange} // Pass onChange to the input
          className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111418] focus:outline-0 focus:ring-0 border-none bg-[#f0f2f4] h-14 placeholder:text-[#637588] p-4 text-base font-normal leading-normal"
        />
      </label>
    </div>
  );
};

export default FormInput;
