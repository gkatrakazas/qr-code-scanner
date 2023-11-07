
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
    

### Usage

1.  Click the "Scan QR Code" button to open the QR code scanning modal.
2.  Point your device's camera towards a QR code.
3.  The app will detect and decode the QR code, and display its content.

## License

This project is licensed under the MIT License.