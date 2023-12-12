import React from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import Layout from '../Layout/Layout';
import Home from '../../Pages/Home/Home';
import Profile from '../../Pages/Profile/Profile';

const AppRouter = () => {

  return (
    <Router>
      <Layout>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
        </Routes>
      </Layout>  
    </Router>
  );
};

export default AppRouter;
