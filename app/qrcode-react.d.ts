declare module 'qrcode.react' {
    import * as React from 'react';
  
    interface QRCodeProps {
      value: string;
      size?: number;
      level?: 'L' | 'M' | 'Q' | 'H';
      bgColor?: string;
      fgColor?: string;
      includeMargin?: boolean;
      renderAs?: 'svg' | 'canvas';
    }
  
    export default class QRCode extends React.Component<QRCodeProps> {}
  }
  