import QRCodeScanner from './QRCodeScanner'; // Replace with the actual import path
import React, { useState } from 'react';
import { BsQrCodeScan } from 'react-icons/bs';

function App() {
  // QR Code part
  const [isQRScannerOpen, setQRScannerOpen] = useState(false);

  const openQRScanner = () => {
    setQRScannerOpen(true);
  };

  const closeQRScanner = () => {
    setQRScannerOpen(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
      <div className="text-center text-white">
        <h1 className="text-4xl font-bold">Welcome to Fancy QR Scanner</h1>
        <p className="text-lg mt-2 mb-6">Scan QR codes with style!</p>

        <button
          className="px-4 py-2 text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-400 font-medium rounded-lg text-lg"
          onClick={openQRScanner} // Open the QR code scanner modal
        >
          <div className="flex items-center">
            <BsQrCodeScan size={24} className="text-white mr-2" />
            <span>Scan QR Code</span>
          </div>
        </button>

        {/* QR Code Scanner Modal */}
        {isQRScannerOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
            <QRCodeScanner onClose={closeQRScanner} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
