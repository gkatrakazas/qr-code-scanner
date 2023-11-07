import logo from './logo.svg';
import QRCodeScanner from './QRCodeScanner'; // Replace with the actual import path
import React, { useState, useEffect } from 'react';
import {BsQrCodeScan} from 'react-icons/bs'

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
    <div>
      					<button
						className="px-2 py-2 mb-2 text-white bg-gray-600 hover:bg-custom-blue-hover focus:ring-4 focus:outline-none focus:ring-custom-blue font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-custom-blue-hover dark:hover:bg-custom-blue-hover dark:focus:ring-custom-blue-hover"
						onClick={openQRScanner} // Open the QR code scanner modal
					>
						<div className="flex items-center">
							<BsQrCodeScan size={20} className="text-white mr-2 sm:inline" />
							<span className="sm:inline">Scan</span>

						</div>

					</button>

          		{/* QR Code Scanner Modal */}
			{isQRScannerOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
        	<QRCodeScanner
          	onClose={closeQRScanner}
					/>
				</div>
			)}
    </div>
  );
}

export default App;
