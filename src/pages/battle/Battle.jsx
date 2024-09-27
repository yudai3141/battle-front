// src/pages/battle/Battle.jsx

import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../state/AuthContext';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './Battle.css';

function Battle() {
  const { user } = useContext(AuthContext);
  const { battleId } = useParams();
  const navigate = useNavigate();
  const [battle, setBattle] = useState(null);
  const [message, setMessage] = useState('');
  const [posts, setPosts] = useState([]); // スレッドの投稿リスト
  const [rounds, setRounds] = useState([]); // ディベートのラウンドリスト

  useEffect(() => {
    
    const fetchBattle = async () => {
      try {
        const res = await axios.get(`/battles/${battleId}`);
        setBattle(res.data);

        // バトルのラウンドを取得
        const roundsRes = await axios.get(`/battles/${battleId}/rounds`);
        setRounds(roundsRes.data);

        // スレッドの投稿を取得（必要に応じて）
        // const postThread = await fetchPostThread(res.data.postId);
        // setPosts(postThread);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBattle();
  }, [battleId]);

  const handleSendMessage = async () => {
    try {
      await axios.post(`/battles/${battleId}/round`, {
        speakerId: user._id,
        content: message,
      });
      setMessage('');

      // 最新のラウンドを取得
      const roundsRes = await axios.get(`/battles/${battleId}/rounds`);
      setRounds(roundsRes.data);

      // バトル情報を更新
      const res = await axios.get(`/battles/${battleId}`);
      setBattle(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSurrender = async () => {
    try {
      await axios.post(`/battles/${battleId}/surrender`, {
        userId: user._id,
      });

      // バトル情報を更新
      const res = await axios.get(`/battles/${battleId}`);
      setBattle(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const isUserTurn = () => {
    if (!battle || battle.isFinished) return false;

    const totalRounds = rounds.length + 1; // 次に投稿するラウンド番号
    const isInitiatorTurn = totalRounds % 2 === 1;

    if (isInitiatorTurn) {
      return battle.initiatorId._id === user._id;
    } else {
      return battle.opponentId._id === user._id;
    }
  };

  // バトルが終了したら結果ページに遷移
  useEffect(() => {
    if (battle && battle.isFinished) {
      // 結果ページにバトルIDを渡して遷移
      navigate(`/battles/${battleId}/result`);
    }
  }, [battle, navigate, battleId]);

  return (
    <div className='battleContainer'>
      <div className='battleRight'>
        {/* ディベートの表示 */}
        <h2>レスバトル</h2>
        {rounds.map((round) => (
          <div
            key={round._id}
            className={round.speakerId._id === user._id ? 'myMessage' : 'opponentMessage'}
          >
            <p>
              <strong>{round.speakerId.username}:</strong> {round.content}
            </p>
          </div>
        ))}

        {/* バトルが終了していない場合のみ表示 */}
        {!battle?.isFinished && (
          <div className='battleActions'>
            {/* 次の発言者が自分かどうかを確認 */}
            {isUserTurn() ? (
              <>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder='メッセージを入力...'
                  maxLength={500}
                />
                <button onClick={handleSendMessage}>送信</button>
                <button onClick={handleSurrender}>降参</button>
              </>
            ) : (
              <p>相手の投稿を待っています...</p>
            )}
          </div>
        )}

        {/* バトルが終了している場合 */}
        {battle?.isFinished && (
          <div className='battleResult'>
            <h3>バトルが終了しました。</h3>
            {battle.winnerId ? (
              <p>
                勝者:{' '}
                {battle.winnerId === user._id
                  ? 'あなた'
                  : battle.winnerId === battle.initiatorId._id
                  ? battle.initiatorId.username
                  : battle.opponentId.username}
              </p>
            ) : (
              <p>勝者: 判定中</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Battle;