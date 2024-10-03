import React from 'react'
import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Timeline from '../../components/timeline/Timeline'
import Rightbar from '../../components/rightbar/Rightbar'
import Banned from "../../pages/banned/Banned";
import './Home.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { AuthContext } from "../../state/AuthContext";
import { useContext } from "react";

export default function Home() {
  const { user } = useContext(AuthContext)
  const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();
  
    if (user && user.redcard) {
      // redcard プロパティにアクセスできます
      console.log("User has a redcard:", user.redcard);
      navigate('/Banned');
    } else {
      console.error("User does not have a redcard or is null.");
    }
  };
  return (
    <>
        <Topbar />
        <div className="homeContainer">
          <Sidebar />
          <Timeline />
          <Rightbar />
        </div>
    </>
  )
}


