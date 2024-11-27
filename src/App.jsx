
import React, { useEffect, useState } from 'react';
import Navbar from './components/navbar';
import Sidebar from './components/sidebar';
import { Routes, Route, Navigate } from 'react-router-dom'; // Import Navigate

import Login from './components/login';
import HomePage from './pages/HomePage'; // Import HomePage

import AddUser from './pages/addUser';
import ListUser from './pages/listUser';
import RoleManagment from './pages/RoleManagement';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

export const backendurl = import.meta.env.VITE_BACKENDURL;
export const currency = "₹";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');

  useEffect(() => {
    localStorage.setItem('token', token);
  }, [token]);

  return (
    <div className='bg-gray-50 min-h-screen'>
      <ToastContainer />
      {
        token === '' ? (
          <Login setToken={setToken} />
        ) : (
          <>
            <Navbar setToken={setToken} />
            <hr />
            <div className='flex w-full'>
              <Sidebar />
              <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>
                <Routes>
                  {/* Default Route for Home Page */}
                  <Route path="/" element={<HomePage />} />
                  
                  {/* Other Routes */}
                 
                  <Route path='/addUser' element={<AddUser token={token} />} />
                 
                  <Route path='/listUser' element={<ListUser token={token} />} />
                  <Route path='/RoleManagement' element={<RoleManagment token={token} />} />
                  
                 
                  
                  {/* Redirect to Home Page for Unknown Routes */}
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </div>
            </div>
          </>
        )
      }
    </div>
  );
};

export default App;
