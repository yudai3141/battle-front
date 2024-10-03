import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Timeline from '../../components/timeline/Timeline'
import Rightbar from '../../components/rightbar/Rightbar'
import './BattleResult.css';
import { AuthContext } from '../../state/AuthContext';

function BattleResult() {
  const { battleId } = useParams();
  const [result, setResult] = useState(null);
  const [post, setPost] = useState(null);
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user,isFetching,error,redcard,dispatch } = useContext(AuthContext);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const res = await axios.get(`/battles/${battleId}/process`);
        setResult(res.data); 
        console.log(result);
        
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
    <>
    <Topbar />
    <div className='battleResultContainer'>
      <Sidebar />
      <div className='main'>
        <h2>バトル結果</h2>
        {result.winnerId ? (
          <div className='winnerSection'>
            <p>勝者:</p>
            <img
              src={
                result.winnerProfilePicture
                  ? PUBLIC_FOLDER + result.winnerProfilePicture
                  : PUBLIC_FOLDER + '/person/noAvatar.png'
              }
              alt={result.winnerUsername}
              className='winnerProfileImage'
            />
            <p className='winnerUsername'>{result.winnerUsername}</p>
            <p>理由: {result.reason}</p>
          </div>
        ) : (
          <p>引き分けです。</p>
        )}
      </div>
      <Rightbar/>
    </div>
    </>
  );
}

export default BattleResult;