import React from 'react';
import bhimApp from '../assets1/bhim-app.png'
import googleApp from '../assets1/google-app.png'
import paytmApp from '../assets1/paytm-app.png'
import phonepeApp from '../assets1/phonepe-app.png'
import qrcode from '../assets1/qrcode.png'

const PaymentForm = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-500 p-4">
      <div className="flex space-x-8"> {/* Flex container for two boxes */}
        {/* Payment Form Box */}
        <div className="bg-white max-w-md w-full p-8 rounded-lg shadow-lg relative">
          <div className="absolute -top-14 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center">
            <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center">
              <p className="text-white text-5xl font-bold">P</p>
            </div>
          </div>
          <div className="">
  <img
    src={qrcode} // Replace with your QR code image URL
    alt="QR Code"
    className="w-80 h-80" // Increased size of the image
  />
          

        
        </div>

   

  {/* UPI Payment Options */}
  <div className="mt-auto text-center pt-8">
    <h3 className="text-blue-900 text-lg font-bold">FOR QUICK PAY</h3>
    <div className="flex justify-around mt-4 space-x-4">
      <a className="flex flex-col items-center text-blue-900">
        <img src={googleApp} alt="Google Pay" className="w-12 mb-2" />
        
      </a>
      <a className="flex flex-col items-center text-blue-900">
        <img src={phonepeApp} alt="PhonePe" className="w-12 mb-2" />
        
      </a>
      <a className="flex flex-col items-center text-blue-900">
        <img src={paytmApp} alt="Paytm" className="w-12 mb-2" />
        
      </a>
      <a className="flex flex-col items-center text-blue-900">
        <img src={bhimApp} alt="BHIM UPI" className="w-12 mb-2" />
        
      </a>
    </div>
  </div>
</div>


      </div>
    </div>
  );
};

export default PaymentForm;
