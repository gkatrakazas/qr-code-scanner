import QRCodeScanner from './QRCodeScanner/QRCodeScanner'; // Replace with the actual import path
import React, { useState } from 'react';
import { BsQrCodeScan } from 'react-icons/bs';

import QRCodeScanner2 from './QRCodeScanner/QRCodeScanner2';
import QRCodeScanner3 from './QRCodeScanner/QRCodeScanner3';
import QRCodeScanner4 from './QRCodeScanner/QRCodeScanner4';
import QRCodeScanner5 from './QRCodeScanner/QRCodeScanner5';

function App() {
  // QR Code part
  const [isQRScannerOpen, setQRScannerOpen] = useState(false);
  const [isQRScannerOpen2, setQRScannerOpen2] = useState(false);
  const [isQRScannerOpen3, setQRScannerOpen3] = useState(false);
  const [isQRScannerOpen4, setQRScannerOpen4] = useState(false);
  const [isQRScannerOpen5, setQRScannerOpen5] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
      <div className="text-center text-white p-2">
        <h1 className="text-4xl font-bold">Welcome to Fancy QR Scanners</h1>
        <p className="text-lg mt-2 mb-6">Scan QR codes with style!</p>

        <div className="space-y-4 text-white">
          <div className="p-4 border rounded-lg shadow-md flex flex-col items-center">
            <h2 className="text-lg font-bold mb-2">Current Scanner</h2>
            <p>QR Scan library: jsQR</p>
            <p>Resolution: max possible</p>
            <button
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-400 font-medium rounded-lg text-lg text-white flex items-center"
              onClick={() => setQRScannerOpen(true)}
            >
              <BsQrCodeScan size={24} className="mr-2" />
              Scan QR Code
            </button>
          </div>

          <div className="p-4 border rounded-lg shadow-md flex flex-col items-center">
            <h2 className="text-lg font-bold mb-2">Advanced Scanner 1</h2>
            <p>QR Scan library: qr-scanner</p>
            <p>Resolution:(ideal:max possible)</p>
            <button
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-400 font-medium rounded-lg text-lg text-white flex items-center"
              onClick={() => setQRScannerOpen2(true)}
            >
              <BsQrCodeScan size={24} className="mr-2" />
              Scan QR Code
            </button>
          </div>

          <div className="p-4 border rounded-lg shadow-md flex flex-col items-center">
            <h2 className="text-lg font-bold mb-2">Advanced Scanner 2</h2>
            <p>QR Scan library: qr-scanner</p>
            <p>Resolution:(ideal: 1920)</p>
            <button
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-400 font-medium rounded-lg text-lg text-white flex items-center"
              onClick={() => setQRScannerOpen3(true)}
            >
              <BsQrCodeScan size={24} className="mr-2" />
              Scan QR Code
            </button>
          </div>

          <div className="p-4 border rounded-lg shadow-md flex flex-col items-center">
            <h2 className="text-lg font-bold mb-2">Advanced Scanner 3</h2>
            <p>QR Scan library: qr-scanner</p>
            <p>Resolution:(min: 720, ideal: 1280, max: max possible)</p>
            <button
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-400 font-medium rounded-lg text-lg text-white flex items-center"
              onClick={() => setQRScannerOpen4(true)}
            >
              <BsQrCodeScan size={24} className="mr-2" />
              Scan QR Code
            </button>
          </div>
          <div className="p-4 border rounded-lg shadow-md flex flex-col items-center">
            <h2 className="text-lg font-bold mb-2">Experimental Scanner</h2>
            <p>QR Scan library: qr-scanner</p>
            <p>wip</p>
            {/* <p>Resolution:(min: 720, ideal: 1280, max: max possible)</p> */}
            <button
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-400 font-medium rounded-lg text-lg text-white flex items-center"
              onClick={() => setQRScannerOpen5(true)}
            >
              <BsQrCodeScan size={24} className="mr-2" />
              Scan QR Code
            </button>
          </div>
        </div>

        {/* QR Code Scanner Modal */}
        {isQRScannerOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
            <QRCodeScanner onClose={() => setQRScannerOpen(false)} />
          </div>
        )}

        {isQRScannerOpen2 && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
            <QRCodeScanner2 onClose={() => setQRScannerOpen2(false)} />
          </div>
        )}
        {isQRScannerOpen3 && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
            <QRCodeScanner3 onClose={() => setQRScannerOpen3(false)} />
          </div>
        )}
        {isQRScannerOpen4 && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
            <QRCodeScanner4 onClose={() => setQRScannerOpen4(false)} />
          </div>
        )}
        {isQRScannerOpen5 && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
            <QRCodeScanner5 onClose={() => setQRScannerOpen5(false)} />
          </div>
        )}

      </div>
    </div>
  );
}

export default App;
