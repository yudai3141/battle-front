import React from 'react';
import {Bookmark, Home, MessageRounded, Notifications, Person, Search, Settings} from '@mui/icons-material';
import './Sidebar.css';
import CloseFriend from '../closeFriend/CloseFriend';
import { Users } from '../../dummyData'
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className='sidebar'>
        <div className="sidebarWrapper">
            <ul className="sidebarList">
                <li className="sidebarListItem">
                    <Link to='/' style={{ textDecoration: "none", color: 'black'}}>
                        <Home className="sidebarIcon" />
                        <span className="sidebarListItemText">ホーム</span>
                    </Link>
                </li>
                <li className="sidebarListItem">
                    <Link to='/' >
                        <Search className="sidebarIcon" />
                        <span className="sidebarListItemText">検索</span>
                    </Link>
                </li>
                <li className="sidebarListItem">
                    <Link to='/'>
                        <Notifications className="sidebarIcon" />
                        <span className="sidebarListItemText">通知</span>
                    </Link>
                </li>
                <li className="sidebarListItem">
                    <Link to='/'>
                        <MessageRounded className="sidebarIcon" />
                        <span className="sidebarListItemText">メッセージ</span>
                    </Link>
                </li>
                <li className="sidebarListItem">
                    <Link to='/'>
                        <Bookmark className="sidebarIcon" />
                        <span className="sidebarListItemText">ブックマーク</span>
                    </Link>
                </li>
                <li className="sidebarListItem">
                    <Link to='/profile/yudai' style={{ textDecoration: "none", color: 'black'}}>   
                        <Person className="sidebarIcon" /> 
                        <span className="sidebarListItemText">プロフィール</span>
                    </Link>
                </li>
                <li className="sidebarListItem">
                    <Link to='/'>
                        <Settings className="sidebarIcon" />
                        <span className="sidebarListItemText">設定</span>
                    </Link>
                </li>
            </ul>
            <hr className="sidebarHr" />
            <ul className="sidebarFriendList">
                {Users.map((user) => (
                    <CloseFriend user={user} key={user.id}/>
                ))}
            </ul>
        </div>
        
    </div>
  )
}

export default Sidebar

