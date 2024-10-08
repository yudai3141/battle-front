import { MoreVert } from "@mui/icons-material";
import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import "./Post.css";
import { format } from "timeago.js";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../state/AuthContext";

export default function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

  const { user: currentUser } = useContext(AuthContext);

  const [showReplyForm, setShowReplyForm] = useState(false);
  const replyDesc = useRef();

  const handleReplyClick = () => {
    setShowReplyForm(!showReplyForm);
  };

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    const newReply = {
      userId: currentUser._id,
      desc: replyDesc.current.value,
    };
    try {
      await axios.post(`/posts/${post._id}/reply`, newReply);
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  const handleLike = async () => {
    try {
      await axios.put(`/posts/${post._id}/like`, { userId: currentUser._id });
    } catch (err) {
      console.log(err);
    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  const handleBattleRequest = async () => {
    try {
      const res = await axios.post('/battles', {
        postId: post._id,
        initiatorId: currentUser._id,
        opponentId: post.userId,
        content: message,
      });
      const battleId = res.data._id;

      await axios.post('/notifications', {
        senderId: currentUser._id,
        receiverId: post.userId,
        battleId: battleId,
        type: 'battle_request',
        isRead: false,
      });
      await axios.put(`/posts/${post._id}`,
        {
            "userId": user._id,
            "battleRequested": true,
            
        },
      );

      navigate(`/battles/${battleId}`);
      
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}>
              <img
                src={
                  user.profilePicture
                    ? PUBLIC_FOLDER + user.profilePicture
                    : PUBLIC_FOLDER + "person/noAvatar.png"
                }
                alt=""
                className="postProfileImage"
              />
            </Link>
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <Link to={`/posts/${post._id}` } style={{ textDecoration: "none", color: 'black'}}>
        <div className="postCenter">
          
            <span className="postText">{post.desc}</span>
            <img className="postImage" src={PUBLIC_FOLDER + post.img} alt="" />
          
        </div>
        </Link>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src={PUBLIC_FOLDER + "/heart.png"}
              alt=""
              onClick={() => handleLike()}
            />
            <span className="postLikeCounter">
              {like}人がいいねを押しました
            </span>
          </div>
          <div className="postBottomRight">
            <span className='postCommentText' onClick={handleReplyClick}>
                コメントする
            </span>
          </div>
        </div>
        {showReplyForm && (
        <form className='replyForm' onSubmit={handleReplySubmit}>
            <input
            type='text'
            placeholder='返信を入力...'
            className='replyInput'
            ref={replyDesc}
            required
            />
            <button className='replyButton' type='submit'>
            返信
            </button>
        </form>
        )}
        {/* レスバトルラン */}
        {currentUser._id !== post.userId && !post.battleRequested && ( // フラグで表示を制御
          <div className="battleSection">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="あなたの主張を入力してください..."
              className="battleTextarea"
            />
            <button className="battleButton" onClick={handleBattleRequest}>
              レスバトルを申し込む
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
