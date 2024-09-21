import React, { useState,useEffect, useContext } from 'react'
import './Post.css'
import { MoreVert } from '@mui/icons-material'
import axios from "axios";
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../state/AuthContext';


function Post({post}) {
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
    const [like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);

    const [user, setUser] = useState({}); //投稿ユーザー

    const {user: currentUser} = useContext(AuthContext); //操作ユーザー

    useEffect(() => {
        const fetchUser = async () => {
        const response = await axios.get(`/users?userId=${post.userId}`);
        setUser(response.data);
        console.log(response.data);
        }
        fetchUser();
    }, [post.userId]);

    const handleLike = async () => {
        try {
            //いいねのAPIを叩く
            await axios.put(`/posts/${post._id}/like`, {userId: currentUser._id});
        } catch (e) {
            console.log(e);
        }

        setLike(isLiked ? like - 1 : like + 1);
        setIsLiked(!isLiked);
    };

  return (
    <div className='post'>
        <div className="postWrapper">
            <div className="postTop">
                <div className="postTopLeft">
                    <Link to={`/profile/${user.username}`}>
                    <img src={user.profilePicture ? PUBLIC_FOLDER + user.profilePicture : PUBLIC_FOLDER + "/person/noAvatar.png"} alt="" className='postProfileImage' />
                    </Link>
                    <span className="postUsername">{user.username}</span>
                    <span className="postdate">{format(post.createdAt)}</span>
                </div>
                <div className="postTopRight">
                    <MoreVert />
                </div>
            </div>
            <div className="postCenter">
                <span className="postText">{post.desc}</span>
                <img src={PUBLIC_FOLDER + post.img} alt="" className='postImage' />
            </div>
            <div className="postBottom">
                <div className="postBottomLeft">
                    <img src={PUBLIC_FOLDER + "/heart.png"} alt="" className='likeIcon' onClick={() => handleLike()}/>
                    <span className="postLikeCounter">
                        {like}人がいいねを押しました
                    </span>
                </div>
                <div className="postBottomRight">
                    <span className="postCommentText">
                        {post.comment} : コメント
                    </span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Post
