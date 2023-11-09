
# React QR Code Scanner App

This is a simple React app that allows you to scan QR codes using your device's camera. It provides a button that opens a modal for QR code scanning.

## Getting Started

To get started with this app, follow the instructions below:

### Prerequisites

Before you begin, make sure you have the following installed on your system:

- Node.js and npm

### Installation

1. Clone this repository to your local machine:

   ```
   git clone https://github.com/your-username/react-qr-code-scanner.git
   ``` 

2.  Navigate to the project directory:
    
    bashCopy code
    
    `cd react-qr-code-scanner` 
    
3.  Install project dependencies:
    
    bashCopy code
    
    `npm install` 
    
### Generating SSL Keys

If you want to enable SSL for your development server, you can generate SSL keys using OpenSSL with the following commands:

bashCopy code

```
openssl genpkey -algorithm RSA -out key.pem
```
```
openssl req -new -key key.pem -x509 -out cert.pem -days 365
``` 

These commands will create a private key (`key.pem`) and a self-signed SSL certificate (`cert.pem`) valid for 365 days. You can use these keys to enable HTTPS in your development environment.

### Running the App

1.  Start the development server:
    
    bashCopy code
    
    `npm start` 
    
2.  Open your web browser and access the app at `http://localhost:3000`.
    

### Mobile Access

To access the app on your mobile device:

1.  Connect your mobile device to the same Wi-Fi network as your PC.
    
2.  Find the IP address of your PC on the local network. You can usually find this by running the following command in your PC's terminal or command prompt:
    
    Windows
    ```
    ipconfig
    ``` 
    
    or
    
    MacOS/Linux
    ```
    ifconfig 
    ``` 
    
    Look for the "IPv4 Address" (Windows) or the "inet" address (macOS/Linux) associated with your network connection. It typically looks like `192.168.x.x`.
    
3.  Note the port number on which the development server is running (usually `3000`).
    
4.  On your mobile device's web browser, enter the following URL, replacing `<your-pc-ip>` with the IP address of your PC and `<port>` with the port number of the development server:
    
    phpCopy code
    
    `https://<your-pc-ip>:<port>` 
    
    For example, if your PC's IP address is `192.168.1.100` and the development server is running on port `3000`, you would enter:
   
    
    `https://192.168.1.100:3000` 
    
5.  You may receive a security warning about the SSL certificate being self-signed. You can proceed to access the app. The connection is secure within your local network.
    

Now, you should be able to use the QR code scanning app on both your PC and mobile device while ensuring secure communication over HTTPS within your local network.

### Usage

1.  Click the "Scan QR Code" button to open the QR code scanning modal.
2.  Point your device's camera towards a QR code.
3.  The app will detect and decode the QR code, and display its content.

## License

This project is licensed under the MIT License.