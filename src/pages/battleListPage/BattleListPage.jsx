import React from 'react';
import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';
import BattleList from '../../components/battleList/BattleList';
import Rightbar from '../../components/rightbar/Rightbar';
import './BattleListPage.css';

function BattleListPage() {
  return (
    <>
      <Topbar />
      <div className='battleListPageContainer'>
        <Sidebar />
        <BattleList />
        <Rightbar />
      </div>
    </>
  );
}

export default BattleListPage;