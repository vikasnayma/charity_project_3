import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './ManagerComponent/Layout'; // Layout component
import Home from './ManagePage/Home';
import Projects from './ManagePage/Projects';
import Donations from './ManagePage/Donation';
import VolunteerAssign from './ManagePage/VolunteerAssign';
import Profile from './ManagerComponent/Profile';
import User from './ManagePage/User';
import Notification from './ManagerComponent/Notification';

function ManagerDashboard() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}> {/* Base route for /manager */}
        <Route index element={<Home />} /> {/* Default component for /manager */}
        <Route path="projects" element={<Projects />} /> {/* /manager/projects */}
        <Route path="donations" element={<Donations />} /> {/* /manager/donations */}
        <Route path="user" element={<User />} />
        <Route path="volunteer-assignment" element={<VolunteerAssign />} /> {/* /manager/volunteer-assignment */}
        <Route path="profile" element={<Profile />} /> {/* /manager/profile */}
        <Route path="notification" element={<Notification />} />
      </Route>
    </Routes>
  );
}

export default ManagerDashboard;
