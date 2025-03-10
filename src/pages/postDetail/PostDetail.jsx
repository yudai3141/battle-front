import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../state/AuthContext';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './PostDetail.css';

function PostDetail() {
  const { user } = useContext(AuthContext);
  const { id } = useParams(); // URLから投稿IDを取得
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`/posts/${id}`);
        setPost(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPost();
  }, [id]);

  const handleChallenge = async () => {
    try {
      // バトルを開始
      const res = await axios.post('/battles', {
        postId: post._id,
        initiatorId: user._id,
        opponentId: post.userId._id ? post.userId._id : post.userId,
        content: message, // 初回の主張
      });

      const battleId = res.data._id;

      // 通知を作成
      await axios.post('/notifications', {
        senderId: user._id,
        receiverId: post.userId._id ? post.userId._id : post.userId,
        battleId: battleId,
        type: 'battle_request', // typeフィールドを追加
        isRead: false,
      });

      // バトルページに遷移
      navigate(`/battles/${battleId}`);
    } catch (err) {
      console.error(err);
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  // デバッグ用ログ
  console.log('User ID:', user._id);
  console.log('Post User ID:', post.userId);
  console.log('Post User ID (._id):', post.userId._id);

  return (
    <div className='postDetail'>
      {/* 投稿の詳細情報を表示 */}
      <h2>{post.title}</h2>
      <p>{post.content}</p>

      {/* 自分以外の投稿にのみバトルを申し込める */}
      {user._id.toString() !== (post.userId._id ? post.userId._id.toString() : post.userId.toString()) && (
        <div className='challengeSection'>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder='あなたの主張を入力してください...'
          />
          <button onClick={handleChallenge}>レスバトルを申し込む</button>
        </div>
      )}
    </div>
  );
}

export default PostDetail;