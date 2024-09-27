import React from 'react';
import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';
import NotificationsList from '../../components/notificationsList/NotificationsList';
import Rightbar from '../../components/rightbar/Rightbar';
import './NotificationsPage.css';

function NotificationsPage() {
  return (
    <>
      <Topbar />
      <div className='notificationsPageContainer'>
        <Sidebar />
        <NotificationsList />
        <Rightbar />
      </div>
    </>
  );
}

export default NotificationsPage;