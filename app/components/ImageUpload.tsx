// ImageUpload.tsx
import React from 'react';

interface ImageUploadProps {
  selectedImage: File | null;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ selectedImage, onFileChange }) => {
  return (
    <div className="mt-5 flex flex-col items-center">
      <input
        type="file"
        id="file-input"
        accept="image/*"
        onChange={onFileChange}
        className="hidden" // Hide the default input field
        disabled={!!selectedImage} // Disable after image is selected
      />
      <label
        htmlFor="file-input"
        className={`px-4 py-2 rounded-lg cursor-pointer text-center ${
          selectedImage ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 text-white'
        }`}
      >
        {selectedImage ? 'Image Uploaded' : 'Upload Proof of Payment'}
      </label>

      {selectedImage && (
        <p className="mt-2 text-sm text-gray-500 text-center">
          Selected file: {selectedImage.name}
        </p>
      )}
    </div>
  );
};

export default ImageUpload;
