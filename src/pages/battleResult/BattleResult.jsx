import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Timeline from '../../components/timeline/Timeline'
import Rightbar from '../../components/rightbar/Rightbar'
import Post from '../../components/post/Post'
import './BattleResult.css';
import { AuthContext } from '../../state/AuthContext';
import { Link, useNavigate } from "react-router-dom";

function BattleResult() {
  const { battleId } = useParams();
  const [result, setResult] = useState(null);
  const [post, setPost] = useState(null);
  const [rounds, setRounds] = useState([]);
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user,isFetching,error,redcard,dispatch } = useContext(AuthContext);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const res = await axios.get(`/battles/${battleId}/process`);
        setResult(res.data); 
        console.log(res.data);
        const re = await axios.get(`/battles/${battleId}/rounds`);
        setRounds(re.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchResult();
  }, [battleId]);

  if (!result) {
    return <div>Loading...</div>;
  }

  return (
    // <>
    // <Topbar />
    // <div className='battleResultContainer'>
    //   <Sidebar />
    //   <div className='main'>
    //     <h2>バトル結果</h2>
    //     {result.winnerId ? (
    //       <div className='winnerSection'>
    //         <p>勝者:</p>
    //         <img
    //           src={
    //             result.winnerProfilePicture
    //               ? PUBLIC_FOLDER + result.winnerProfilePicture
    //               : PUBLIC_FOLDER + '/person/noAvatar.png'
    //           }
    //           alt={result.winnerUsername}
    //           className='winnerProfileImage'
    //         />
    //         <p className='winnerUsername'>{result.winnerUsername}</p>
    //         <p>理由: {result.reason}</p>
    //       </div>
    //     ) : (
    //       <p>引き分けです。</p>
    //     )}
    //   </div>
    //   <Rightbar/>
    // </div>
    // </>
    <>
  <Topbar />
  <div className="battleResultContainer">
    <Sidebar />
    <div className="main">
      <h2>バトル結果</h2>
      {result.winnerId ? (
        <div className="winnerSection">
          <div className="winnerProfileCard">
            <img
              src={
                result.winnerProfilePicture
                  ? PUBLIC_FOLDER + result.winnerProfilePicture
                  : PUBLIC_FOLDER + "/person/noAvatar.png"
              }
              alt={result.winnerUsername}
              className="winnerProfileImage"
            />
            <div className="winnerInfo">
              {/* <p className="winnerUsername">{result.winnerUsername}</p> */}
              <p className="winnerUsername">{result.winnerUsername}</p>
              {/* <p className="reason">理由: {result.reason}</p> */}
              {result.reason ? (
                <p className="reason">{result.reason}</p>
              ) : (
                <p className="reason">理由の受信中です...</p>
              )}
            </div>
          </div>
          {/* 親ポストの情報表示 */}
          <div className="parentPostSection">
            <h3>元ポスト/レスバトル</h3>
            <div className="parentPostCard">
              {/* <p>{parentPost.content}</p> */}
              <p>
                <Post post={result.start_post} key={result.start_post_key} />
                {result.start_post_key !== result.parent_post_key && (
                  <Post post={result.parent_post} key={result.parent_post_key} />
                )}
              </p>
              {rounds.map((round) => (
              <div
                key={round._id}
                className={`battleRound ${
                  round.speakerId._id === user._id ? 'myRound' : 'opponentRound'
                }`}
              >
                <Link to={`/profile/${round.speakerId.username}`} style={{ textDecoration: "none", color: 'black'}}>
                <div className='roundHeader'>
                  <strong>{round.speakerId.username}:</strong>
                </div>
                <div className='roundContent'>{round.content}</div>
                </Link>
              </div>
            ))}
            </div>
          </div>
        </div>
      ) : (
        <p>引き分けです。</p>
      )}
    </div>
    <Rightbar />
  </div>
</>

  );
}

export default BattleResult;