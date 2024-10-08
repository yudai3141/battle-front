import React, { useState, useEffect } from 'react'
import './Profile.css'
import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Timeline from '../../components/timeline/Timeline'
import Rightbar from '../../components/rightbar/Rightbar'
import axios from "axios"
import { useParams } from 'react-router-dom';



function Profile() {
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

    const [user, setUser] = useState({});
    const username = useParams().username;
    console.log(username)

    useEffect(() => {
        const fetchUser = async () => {
        const response = await axios.get(`/users?username=${username}`);
        setUser(response.data);
        console.log(response.data);
        }
        fetchUser();
    }, []);

  return (
    <>
    <Topbar />
    <div className="profile">
        <Sidebar />
        <div className="profileRight">
            <div className="profileRightTop">
                <div className="profileCover">
                    <img 
                        src={user.coverPicture ? PUBLIC_FOLDER + user.coverPicture : PUBLIC_FOLDER + "/post/3.jpeg"} 
                        alt="" 
                        className="profileCoverImage" 
                    />
                    <img 
                        src={user.profilePicture ? PUBLIC_FOLDER + user.profilePicture : PUBLIC_FOLDER + "/person/noAvatar.png"} 
                        alt="" 
                        className="profileUserImage" 
                    />
                </div>
                <div className="profileInfo">
                    {/* ユーザ名とレートを少し下に配置 */}
                    <h4 className="profileInfoName">{user.username}</h4>
                    <span className="profileInfoDesc">{user.desc}</span>
                    <span className="profileInfoRate">Rate: {user.eloRating || 'N/A'}</span>
                    
                    {/* カードアイコン */}
                    <div className="profileCardIcons">
                        {user.yellowcard && (
                            <img src={`${PUBLIC_FOLDER}/icons/yellow-card.png`} alt="Yellow Card" className="profileCardIcon" />
                        )}
                        {user.redcard && (
                            <img src={`${PUBLIC_FOLDER}/icons/red-card.png`} alt="Red Card" className="profileCardIcon" />
                        )}
                    </div>

                    {/* メッセージとフォローボタン */}
                    <div className="profileActions">
                        <button className="profileButton">メッセージ</button>
                        <button className="profileButton">フォロー</button>
                    </div>
                </div>
            </div>
            <div className="profileRightBottom">
                <Timeline username={username}/>
                <Rightbar user={user} />
            </div>
        </div>
    </div>
    </>

    // <>
    //     <Topbar />
    //     <div className="profile">
    //         <Sidebar />
    //         <div className="profileRight">
    //             <div className="profileRightTop">
    //                 <div className="profileCover">
    //                     <img src={user.coverPicture ? PUBLIC_FOLDER + user.coverPicture : PUBLIC_FOLDER + "/post/3.jpeg"} alt="" className='profileCoverImage' />
    //                     <img src={user.profilePicture ? PUBLIC_FOLDER + user.profilePicture : PUBLIC_FOLDER + "/person/noAvatar.png"} alt="" className='profileUserImage' />
    //                 </div>
    //                 <div className="profileInfo">
    //                     <h4 className="profileInfoName">{user.username}</h4>
    //                     <span className="profileInfoDesc">{user.desc}</span>

    //                     {/* レート数値の表示 */}
    //                     <span className="profileInfoRate">Rate: {user.eloRating || 'N/A'}</span>

    //                     {/* イエローカード・レッドカードのアイコン表示 */}
    //                     <div className="profileCardIcons">
    //                         {user.yellowcard && (
    //                             <img src={`${PUBLIC_FOLDER}/icons/yellow-card.png`} alt="Yellow Card" className="profileCardIcon" />
    //                         )}
    //                         {user.redcard && (
    //                             <img src={`${PUBLIC_FOLDER}/icons/red-card.png`} alt="Red Card" className="profileCardIcon" />
    //                         )}
    //                     </div>

    //                     {/* メッセージやフォローボタン */}
    //                     <div className="profileActions">
    //                         <button className="profileButton">メッセージ</button>
    //                         <button className="profileButton">フォロー</button>
    //                     </div>
    //                 </div>
    //             </div>
    //             <div className="profileRightBottom">
    //                 <Timeline username={username}/>
    //                 <Rightbar user={user} />
    //             </div>
    //         </div>
    //     </div>
    //     </>
  )
}

export default Profile
