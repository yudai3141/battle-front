import React, { useContext } from 'react';
import {Bookmark, Home, MessageRounded, Notifications, Person, Search, Settings} from '@mui/icons-material';
import './Sidebar.css';
import CloseFriend from '../closeFriend/CloseFriend';
import { Users } from '../../dummyData'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../state/AuthContext';

function Sidebar() {
    const { user } = useContext(AuthContext); // 追加
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
                    <Link to='/' style={{ textDecoration: "none", color: 'black'}}>
                        <Search className="sidebarIcon" />
                        <span className="sidebarListItemText">検索</span>
                    </Link>
                </li>
                <li className="sidebarListItem">
                    <Link to='/notifications' style={{ textDecoration: "none", color: 'black' }}>
                        <Notifications className="sidebarIcon" />
                        <span className="sidebarListItemText">通知</span>
                    </Link>
                </li>
                <li className="sidebarListItem">
                    <Link to='/' style={{ textDecoration: "none", color: 'black'}}>
                        <MessageRounded className="sidebarIcon" />
                        <span className="sidebarListItemText">メッセージ</span>
                    </Link>
                </li>
                <li className="sidebarListItem">
                    <Link to='/battles' style={{ textDecoration: "none", color: 'black' }}>
                    <Bookmark className="sidebarIcon" />
                    <span className="sidebarListItemText">レスバトル一覧</span>
                    </Link>
                </li>
                <li className="sidebarListItem">
                    <Link to={`/profile/${user.username}`} style={{ textDecoration: "none", color: 'black'}}>   
                        <Person className="sidebarIcon" /> 
                        <span className="sidebarListItemText">プロフィール</span>
                    </Link>
                </li>
                <li className="sidebarListItem">
                    <Link to='/' style={{ textDecoration: "none", color: 'black'}}>
                        <Settings className="sidebarIcon" />
                        <span className="sidebarListItemText">設定</span>
                    </Link>
                </li>
            </ul>
            {/* <hr className="sidebarHr" />
            <ul className="sidebarFriendList">
                {Users.map((user) => (
                    <CloseFriend user={user} key={user.id}/>
                ))}
            </ul> */}
        </div>
        
    </div>
  )
}

export default Sidebar

