// import React from 'react'
// import './Rightbar.css'
// import { Users } from '../../dummyData'
// import Online from '../online/Online'

// function Rightbar({user}) {
//   const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
//   const HomeRightbar = () => {
//     return (
//       <>
//         <div className="eventContainer">
//           <img src="assets/star.png" alt="" className='starImage' />
//           <span className="eventText">
//             <b>フォロワー限定</b>イベント開催中
//             </span>
//         </div>
//         <img src="assets/event.jpeg" alt="" className='eventImage' />
//         <h4 rightbarTitle>オンラインの友達</h4>
//         <ul className="rightbarFriendList">
//           {Users.map((user) => (
//             <Online user={user} key={user.id} />
//           ))}
//         </ul>
//         <p className="promotionTitle">プロモーション広告</p>
//         <img src="assets/promotion/promotion1.jpeg" alt="" className='rightbarPromotionImage' />
//         <p className="promotionName">ショッピング</p>
//         <img src="assets/promotion/promotion2.jpeg" alt="" className='rightbarPromotionImage' />
//         <p className="promotionName">カーショップ</p>
//         <img src="assets/promotion/promotion3.jpeg" alt="" className='rightbarPromotionImage' />
//         <p className="promotionName">本田株式会社</p>
//       </>
//     )
//   }

//   const ProfileRightbar = () => {
//     return (
//       <>
//       <h4 className="rightbarTitle">ユーザー情報</h4>
//       <div className="rightbarInfo">
//         <div className="rightbarInfoItem">
//           <span className="rightbarInfoKey">出身:</span>
//           <span className="rightbarInfoKey">福岡</span>
//         </div>
//         <h4 className="rightbarTitle">あなたの友達</h4>
//         <div className="rightbarFollowings">
//           <div className="rightbarFollowing">
//             <img src={PUBLIC_FOLDER + "/person/1.jpeg"} alt="" className='rightbarFollowingImage' />
//             <span className="rightbarFollowingName">Shin Code</span>
//           </div>
//           <div className="rightbarFollowing">
//             <img src={PUBLIC_FOLDER + "/person/5.jpeg"} alt="" className='rightbarFollowingImage' />
//             <span className="rightbarFollowingName">Shin Code</span>
//           </div>
//           <div className="rightbarFollowing">
//             <img src={PUBLIC_FOLDER + "/person/2.jpeg"} alt="" className='rightbarFollowingImage' />
//             <span className="rightbarFollowingName">田中</span>
//           </div>
//           <div className="rightbarFollowing">
//             <img src={PUBLIC_FOLDER + "/person/3.jpeg"} alt="" className='rightbarFollowingImage' />
//             <span className="rightbarFollowingName">山田</span>
//           </div>
//           <div className="rightbarFollowing">
//             <img src={PUBLIC_FOLDER + "/person/4.jpeg"} alt="" className='rightbarFollowingImage' />
//             <span className="rightbarFollowingName">近藤</span>
//           </div>
//         </div>
//       </div>
//       </>
//     )
//   }

//   return (
//     <div className="rightbar">
//       <div className="rightbarWrapper">
//         {user ? <ProfileRightbar/> : <HomeRightbar/>}
//       </div>
//     </div>
//   );
// }

// export default Rightbar
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Rightbar.css';
import { Link } from 'react-router-dom';

function Rightbar() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchRateRanking = async () => {
      try {
        // レートランキングのデータを取得（上位5名のみ）
        const res = await axios.get('/users/rate-ranking');
        setUsers(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRateRanking();
  }, []);

  return (
    <div className="rateRankingRightbar">
      <h4 className="rateRankingTitle">レートランキング</h4>
      <ul className="rateRankingList">
        {users.map((user, index) => (
          <li key={user._id} className="rateRankingItem">
            <span className="rateRankingPosition">{index + 1}.</span>
            <Link to={`/profile/${user.username}`} className="rateRankingLink">
              <img
                src={user.profilePicture ? user.profilePicture : '/assets/person/noAvatar.png'}
                alt={user.username}
                className="rateRankingImage"
              />
              <span className="rateRankingName">{user.username}</span>
            </Link>
            <span className="rateRankingScore">Elo: {user.eloRating}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Rightbar;