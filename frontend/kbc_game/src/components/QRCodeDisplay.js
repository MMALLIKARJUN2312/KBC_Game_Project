import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import '../styles/QRCodeDisplay.css';

const QRCodeDisplay = ({ value }) => {
  const localIP = '192.168.31.69';  
  const qrValue = `http://${localIP}:3000/join`;  

  console.log('QR Code Value:', qrValue);

  return (
    <div className="qrcode-container">
      <QRCodeCanvas value={qrValue} size={256} />
    </div>
  );
};

export default QRCodeDisplay;
