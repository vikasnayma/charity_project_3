import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { Children } from 'react';

const DonationContext = createContext();

export const DonationProvider = ( {Children }) => {
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    // Fetch all donations from the backend
    const fetchDonations = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:9000/api/donation');
        setDonations(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  // Add a new donation
  const addDonation = async (donation) => {
    try {
      const response = await axios.post('http://localhost:9000/api/donation', donation);
      setDonations([...donations, response.data]);
    } catch (err) {
      setError(err.message);
    }
  };

 
  // Fetch donation by ID
  const fetchDonationById = async (donationId) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:9000/api/donation/${donationId}`);
      return response.data; // Return the specific donation data
    } catch (err) {
      setError(err.message);
      return null; // Return null in case of an error
    } finally {
      setLoading(false);
    }
  };

  // Update a donation
  const updateDonation = async (donationId, updatedDonation) => {
    try {
      const response = await axios.put(`http://localhost:9000/api/donation/${donationId}`, updatedDonation);
      setDonations(donations.map(d => (d.id === donationId ? response.data : d)));
    } catch (err) {
      setError(err.message);
    }
  };


  return (
    <DonationContext.Provider value={{ donations, loading, error, fetchDonations , addDonation, deleteDonation, updateDonation }}>
      {children}
    </DonationContext.Provider>
  );
};

export default DonationContext;