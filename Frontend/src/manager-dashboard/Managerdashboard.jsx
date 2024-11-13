import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './ManagerComponent/Layout';
import Home from './ManagePage/Home';
import Projects from './ManagePage/Projects';
import Donations from './ManagePage/Donation';
import VolunteerAssign from './ManagePage/VolunteerAssign';
import Profile from './ManagerComponent/Profile';
import User from './ManagePage/User';
import Notification from './ManagerComponent/Notification';
import withAuth from './WithAuth';

function ManagerDashboard() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={withAuth(Home)} /> {/* Protected Home */}
        <Route path="projects" element={withAuth(Projects)} /> {/* Protected Projects */}
        <Route path="donations" element={withAuth(Donations)} /> {/* Protected Donations */}
        <Route path="user" element={withAuth(User)} /> {/* Protected User */}
        <Route path="volunteer-assignment" element={withAuth(VolunteerAssign)} /> {/* Protected VolunteerAssign */}
        <Route path="profile" element={withAuth(Profile)} /> {/* Protected Profile */}
        <Route path="notification" element={withAuth(Notification)} /> {/* Protected Notification */}
      </Route>
    </Routes>
  );
}

export default ManagerDashboard;