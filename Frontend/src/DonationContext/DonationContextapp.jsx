import React from "react";
import { DonationProvider } from '../DonationContext/DonationContext';
import Dashboard from '../Pages/Dashboard';

function DonationContextApp() {
    return (
      <DonationProvider>
        <Dashboard />
      </DonationProvider>
    );
  }
  
  export default DonationContextApp;