import React from 'react';
import { Outlet } from 'react-router-dom';
import Dashboard from '../DashBoard/dashboard';
import NavBar from '../../Components/navbar';

export default function Home() {
  return (
    <>
      
      <NavBar />

     
      <main className="h-[94vh] relative overflow-auto">
        
        <Dashboard />

      
        <Outlet />
      </main>
    </>
  );
}
