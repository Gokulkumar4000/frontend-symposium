// QRCodeDisplay.tsx
import React from 'react';
import QRCode from 'react-qr-code';

interface QRCodeDisplayProps {
  upiLink: string;
}

const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ upiLink }) => {
  return (
    <div className="flex flex-col items-center">
      <p className="mb-2 text-lg">Scan the QR code to pay:</p>
      <QRCode value={upiLink} size={200} />
    </div>
  );
};

export default QRCodeDisplay;
