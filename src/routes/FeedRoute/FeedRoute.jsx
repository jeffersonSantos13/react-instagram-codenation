import React, { useState, useEffect } from 'react';

import Stories from '../../containers/Stories';
import Loading from '../../components/Loading';

import Posts from '../../containers/Posts';

import api from '../../services/api';

import './FeedRoute.scss';

const FeedRoute = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [stories, setStories] = useState([]);
  const [userPosts, setUserPosts] = useState(0);

  const getUserPostById = (postUserId) => users.find(user => postUserId === user.id);

  useEffect(() => {
    (async() => {
      const data = await api.getUsers();
      setUsers(data);
    })()
  }, []);

  useEffect(() => {
    if (userPosts !== users.length) {
      const { id } = users[userPosts];

      fetch(`https://5e7d0266a917d70016684219.mockapi.io/api/v1/users/${id}/posts`)
      .then((res) => res.json())
      .then(data => {
        setPosts([...posts, ...data]);
        setUserPosts(userPosts + 1);
      }); 
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users, userPosts]);

  useEffect(() => {
    (async() => {
      const data = await api.getStories();
      setStories(data)
    })()
  }, [users]);
  
  return (
    <div data-testid="feed-route">
      {(users.length > 0 && stories.length > 0) && (
        <Stories
          stories={stories}
          getUserHandler={getUserPostById}
        />
      )}

      {users.length !== userPosts
        ? (<Loading />)
        : (
          <Posts
            posts={posts}
            getUserHandler={getUserPostById}
          />
        )
      }
    </div>
  );
};

export default FeedRoute;
