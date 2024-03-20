import React, { useState, useEffect, useRef } from 'react';
import Webcam from 'react-webcam';
import jsQR from 'jsqr';
import { BsQrCodeScan } from 'react-icons/bs';
import { PiCameraRotateFill } from 'react-icons/pi';
import Spinner from './Spinner';
import { FaCheckCircle } from "react-icons/fa";
import CornerBox from './CornerBox';
import ScanningLine from './ScanningLine';
import { RiZoomInFill, RiZoomOutFill } from "react-icons/ri";

const QRScanner = ({ onClose }) => {

	const [devices, setDevices] = useState([]);
	const [bestCameraResolutions, setBestCameraResolutions] = useState({ front: null, back: null });
	const webcamRef = useRef(null);
	const [cameraReady, setCameraReady] = useState(false);
	const [loading, setLoading] = useState(false);
	const [currentDeviceIndex, setCurrentDeviceIndex] = useState(0);
	const [qrDetected, setQrDetected] = useState(false);
	const [boxSize, setBoxSize] = useState(null);
	// const { t } = useTranslation();
	const [zoomLevel, setZoomLevel] = useState(1);
	const [hasCameraPermission, setHasCameraPermission] = useState();

	const handleZoomChange = (event) => {
		const newZoomLevel = Number(event.target.value);
		setZoomLevel(newZoomLevel);
	};

	const handleZoomIn = () => {
		setZoomLevel(prevZoomLevel => Math.min(prevZoomLevel + 0.2, 3));
	};

	const handleZoomOut = () => {
		setZoomLevel(prevZoomLevel => Math.max(prevZoomLevel - 0.2, 1));
	};

	const handleClose = () => {
		onClose();
	};

    useEffect(() => {
        // Request camera access
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                setHasCameraPermission(true);
                stream.getTracks().forEach(track => track.stop());
            })
            .catch(error => {
                console.error("Camera access denied:", error);
                setHasCameraPermission(false);
            });
    }, []);

	useEffect(() => {
		if (hasCameraPermission) {
			navigator.mediaDevices.enumerateDevices()
				.then(async mediaDevices => {
					const videoDevices = mediaDevices.filter(({ kind }) => kind === "videoinput");

					let bestFrontCamera = null;
					let bestBackCamera = null;

					for (const device of videoDevices) {
						const stream = await navigator.mediaDevices.getUserMedia({ video: { deviceId: device.deviceId } });
						const track = stream.getVideoTracks()[0];
						const capabilities = track.getCapabilities();
						console.log(device, capabilities);

						const isBackCamera = device.label.toLowerCase().includes('back');
						const resolution = {
							width: capabilities.width?.max || 0,
							height: capabilities.height?.max || 0
						};

						if (isBackCamera && (!bestBackCamera || bestBackCamera.resolution.width * bestBackCamera.resolution.height < resolution.width * resolution.height)) {
							bestBackCamera = { device, resolution };
						} else if (!isBackCamera && (!bestFrontCamera || bestFrontCamera.resolution.width * bestFrontCamera.resolution.height < resolution.width * resolution.height)) {
							bestFrontCamera = { device, resolution };
						}

						track.stop(); // Make sure to stop the track to release the camera
					}

					const filteredDevices = [];
					if (bestFrontCamera) {
						filteredDevices.push(bestFrontCamera.device);
					}
					if (bestBackCamera) {
						filteredDevices.push(bestBackCamera.device);
					}

					setBestCameraResolutions({
						front: bestFrontCamera ? bestFrontCamera.resolution : null,
						back: bestBackCamera ? bestBackCamera.resolution : null,
					});

					setDevices(filteredDevices);
					console.log('filteredDevices', filteredDevices)
					// Find the index of the best back camera in the filteredDevices array
					const backCameraIndex = filteredDevices.findIndex(device =>
						device.label.toLowerCase().includes('back'));

					if (backCameraIndex !== -1) {
						setCurrentDeviceIndex(backCameraIndex);
					} else {
						setCurrentDeviceIndex(0); // Default to the first camera if no back camera is identified
					}
					setCameraReady(true);
				})
				.catch(error => {
					console.error("Error enumerating devices:", error);
				});
		}
	}, [hasCameraPermission]);

	const switchCamera = () => {
		if (devices.length > 1) {
			const newIndex = (currentDeviceIndex + 1) % devices.length;
			setCurrentDeviceIndex(newIndex);
		}
	};

	const capture = () => {
		if (webcamRef.current) {
			const imageSrc = webcamRef.current.getScreenshot();
			if (imageSrc) {
				const image = new Image();
				image.src = imageSrc;
				image.onload = () => {
					const canvas = document.createElement('canvas');
					const context = canvas.getContext('2d');
					canvas.width = image.width;
					canvas.height = image.height;
					context.drawImage(image, 0, 0, image.width, image.height);
					const imageData = context.getImageData(0, 0, image.width, image.height);
					const code = jsQR(imageData.data, imageData.width, imageData.height);
					if (code) {
						setQrDetected(true);
						// Redirect to the URL found in the QR code
						const scannedUrl = code.data;
						setTimeout(() => {
							setLoading(true);
						}, 1000);
						setTimeout(() => {
							const baseUrl = window.location.origin;
							const params = scannedUrl.split('?');
							const cvUrl = `${baseUrl}/cb?${params[1]}&wwwallet_camera_was_used=true`;
							window.location.href = cvUrl;
						}, 1000);

					}
				};
			}
		}
	};

	const calculateBoxSize = () => {
		if (webcamRef.current && webcamRef.current.video.videoWidth) {
			const webcamElement = webcamRef.current.video;
			const width = webcamElement.offsetWidth;
			const height = webcamElement.offsetHeight;
			const size = Math.min(width, height) * 0.9;
			console.log(width, height, size, height - width);
			let adjust = 20;
			if (height > width) {
				adjust = (height - size) / 2;
			}
			console.log('adjust', adjust);

			document.documentElement.style.setProperty('--scanning-range', adjust + 'px');
			document.documentElement.style.setProperty('--scanning', size + 'px');
			console.log(size);
			setBoxSize(size);
		}
	};

	useEffect(() => {
		if (cameraReady) {
			const interval = setInterval(capture, 500);
			return () => clearInterval(interval);
		}
	}, [cameraReady]);

	useEffect(() => {
		calculateBoxSize();
		console.log('calculate box');
		window.addEventListener('resize', calculateBoxSize);
		return () => window.removeEventListener('resize', calculateBoxSize);
	}, []);

	const waitForVideoDimensions = () => {
		const checkDimensions = () => {
			if (webcamRef.current && webcamRef.current.video.videoWidth) {
				calculateBoxSize();
			} else {
				setTimeout(checkDimensions, 100);
			}
		};
		checkDimensions();
	};

	const onUserMedia = () => {

		waitForVideoDimensions();
	};

	const currentCameraType = devices[currentDeviceIndex]?.label.toLowerCase().includes('back') ? 'back' : 'front';
	const maxResolution = bestCameraResolutions[currentCameraType];

	let idealWidth, idealHeight;
	if (maxResolution) {
		console.log(maxResolution);
		if ((maxResolution.width < maxResolution.height)) {
			idealHeight = maxResolution.width;
			idealWidth = maxResolution.width;

		} else {
			idealHeight = maxResolution.height;
			idealWidth = maxResolution.height;
		}
	}

	return (
		<div className="fixed inset-0 flex items-center justify-center z-50">
			<div className="absolute inset-0 bg-black opacity-50"></div>

            {hasCameraPermission===false ? (
                <div className="bg-white p-4 rounded-lg shadow-lg w-full lg:w-[33.33%] sm:w-[66.67%] z-10 relative m-4">
					<div className="flex items-start justify-between border-b rounded-t dark:border-gray-600">
						<h2 className="text-lg font-bold mb-2 text-custom-blue">
							<BsQrCodeScan size={20} className="inline mr-1 mb-1" />
							xaxa
						</h2>

						<button
							type="button"
							className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
							onClick={handleClose}
						>
							<svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
								<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
							</svg>
						</button>
					</div>
					<hr className="mb-2 border-t border-custom-blue/80" />
                    <p className='text-gray-700'>Please allow camera access to use the QR scanner.</p>
                </div>
            ) : (!cameraReady || loading) ? (
					<div className="flex items-center justify-center h-24">
						<Spinner />
					</div>
				) : (
					<div className="bg-white p-4 rounded-lg shadow-lg w-full lg:w-[33.33%] sm:w-[66.67%] z-10 relative m-4">
						<div className="flex items-start justify-between border-b rounded-t dark:border-gray-600">
						<h2 className="text-lg font-bold mb-2 text-custom-blue">
							<BsQrCodeScan size={20} className="inline mr-1 mb-1" />
							xaxa
						</h2>

						<button
							type="button"
							className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
							onClick={handleClose}
						>
							<svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
								<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
							</svg>
						</button>
					</div>
					<hr className="mb-2 border-t border-custom-blue/80" />
					<p className="italic pd-2 text-gray-700">
						Target the QR Code, and you will redirect to proceed with the process
					</p>
					<div className="webcam-container" style={{ position: 'relative', overflow: 'hidden' }}>
						<Webcam
							audio={false}
							ref={webcamRef}
							screenshotFormat="image/jpeg"
							videoConstraints={{
								deviceId: devices[currentDeviceIndex]?.deviceId,
								height: { ideal: idealHeight },
								width: { ideal: idealWidth }
							}}
							style={{ height: 'auto', transform: `scale(${zoomLevel})`, transformOrigin: 'center', width: '100%',  }}
							onUserMedia={onUserMedia}
						/>
						{boxSize && (
							<>
								<CornerBox qrDetected={qrDetected} side="borderLeft" position="borderTop" boxSize={boxSize} />
								<CornerBox qrDetected={qrDetected} side="borderRight" position="borderTop" boxSize={boxSize} />
								<CornerBox qrDetected={qrDetected} side="borderLeft" position="borderBottom" boxSize={boxSize} />
								<CornerBox qrDetected={qrDetected} side="borderRight" position="borderBottom" boxSize={boxSize} />
								<ScanningLine qrDetected={qrDetected} boxSize={boxSize} />
							</>
						)}
						{qrDetected && (
							<div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
								<FaCheckCircle size={100} color="green" />
							</div>
						)}
					</div>
					<div className='flex justify-between align-center'>
						<div className="flex items-center my-4 pr-4 w-full">
							<RiZoomOutFill className="text-gray-400 mr-2 mt-2" onClick={handleZoomOut} size={35} />
							<input
								type="range"
								min="1"
								max="3"
								step="0.1"
								value={zoomLevel}
								onChange={handleZoomChange}
								className="w-full h-2 bg-gray-200 rounded-lg cursor-pointer dark:bg-gray-700 mt-2"
							/>
							<RiZoomInFill className="text-gray-400 ml-2 mt-2" onClick={handleZoomIn} size={35} />
						</div>
						{devices.length > 1 && (
							<button
								type="button"
								className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm ml-4 p-2 my-2"
								onClick={switchCamera}
							>
								<PiCameraRotateFill size={25} />
							</button>
						)}
					</div>
				</div>
				)}
		</div>
	);
};

export default QRScanner;
