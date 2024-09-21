import React from 'react'

function CloseFriend({user}) {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div>
        <li className="sidebarFriend">
            <img src={PUBLIC_FOLDER + user.profilePicture} alt="" className='sidebarFriendImage'/>
            <span className="sidebarFriendName">{user.username}</span>
        </li>
    </div>
  )
}

export default CloseFriend
