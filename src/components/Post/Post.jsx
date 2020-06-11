import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './Post.scss';

const Post = ({ postInfo, userInfo }) => {
  const [follow, togleFollow] = useState(false);
  const [like, setLike] = useState(false);

  const { imageUrl, comments } = postInfo;

  let postLikes = (comments.length - 1) + like;

  return (
    <article className="post" data-testid="post">
      { userInfo && (
        <header className="post__header">
          <div className="user">
            <Link to={`/users/${userInfo.username}`} className="user__thumb">
              <img src={userInfo.avatar} alt="userInfo.username" />
            </Link>
            <Link to={`/users/${userInfo.username}`} className='user__name'>
              {userInfo.username}
            </Link>
          </div>

          <button 
            className="post__context"
            onClick={() => togleFollow(!follow)}
          >
            {follow 
              ? <span className="follow-btn is-following">Seguindo</span>
              : <span className="follow-btn">Seguir</span>
            }
          </button>
        </header>
      )}
      
      <div className="post__figure">
        <img src={imageUrl} alt="" />
      </div>

      {userInfo && postLikes > 0 && (
        <nav className="post__controls">
          <button 
            className="post__control"
            onClick={() => setLike(!like)}
          >
            {like
              ? <i className="fas fa-heart"></i> 
              : <i className="far fa-heart"></i>
            }
          </button>

          <div className="post__status">
            <div className="user">
              <span>
                curtido por <Link to="/" >{comments[0].name}</Link> e outra{postLikes > 1 && 's'} <Link to="/">
                {postLikes} pessoa{postLikes > 1 && 's'}.</Link>
              </span>
            </div>
          </div>
        </nav>
      )}
    </article>
  );
};

export default Post;
