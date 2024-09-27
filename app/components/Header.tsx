import React from 'react';
import img from "../../public/images/img.jpg"

console.log(img);
const Header: React.FC = () => {
  return (
    <div
      className="bg-cover bg-center flex flex-col justify-end overflow-hidden bg-white min-h-[218px] rounded-xl"
      style={{
        backgroundImage:`url('/images/img.jpg')`,
        height: '218px', // Ensure there's height for visibility
        width: '100%' // Ensure it takes full width
      }}
    >
      <div className="flex p-4">
        <p className="text-white tracking-light text-[28px] font-bold leading-tight">
          Registration
        </p>
      </div>
    </div>
  );
};

export default Header;
