import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../state/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './NotificationsList.css';

function NotificationsList() {
  const { user } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get(`/notifications/${user._id}`);
        setNotifications(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchNotifications();
  }, [user._id]);

  const handleAcceptBattle = (notification) => {
    setSelectedNotification(notification);
  };

  const handleSubmitResponse = async () => {
    try {
      // 第2ラウンドを追加
      await axios.post(`/battles/${selectedNotification.battleId}/round`, {
        speakerId: user._id,
        content: message,
      });
  
      // 通知を既読に更新
      await axios.put(`/notifications/${selectedNotification._id}/read`, {
        isRead: true,
      });
  
      // バトルページに遷移
      navigate(`/battles/${selectedNotification.battleId}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='notificationsList'>
      <h2>通知</h2>
      {notifications.map((notification) => (
        <div key={notification._id} className='notificationItem'>
          <p>{`${notification.senderUsername}さんからレスバトルの申し込みがあります`}</p>
          {!notification.isRead && (
            <button onClick={() => handleAcceptBattle(notification)}>応戦する</button>
          )}
        </div>
      ))}

      {/* 応戦時の反論入力フォーム */}
      {selectedNotification && (
        <div className='responseForm'>
          <h3>反論を入力してください</h3>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder='あなたの反論を入力してください...'
          />
          <button onClick={handleSubmitResponse}>送信</button>
        </div>
      )}
    </div>
  );
}

export default NotificationsList;