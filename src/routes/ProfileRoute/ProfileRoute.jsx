import React, { useState, useEffect } from 'react';

import UserProfile from '../../containers/UserProfile';
import UserPosts from '../../containers/UserPosts';

import Loading from '../../components/Loading';

import api from '../../services/api';

const ProfileRoute = () => {
  const [id, setId] = useState(0);
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [username, setUsername] = useState('');
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async() => {
      const { pathname } = window.location;
      const param = pathname.split("/")[2];

      const data = await api.getUser(param);
      const { id, name, avatar, username } = data[0];

      setId(id);
      setName(name);
      setAvatar(avatar);
      setUsername(username);
    })()
  }, []);

  useEffect(() => {
    (async() => {
      if (id) {
        const posts = await api.getPosts(id);

        setPosts(posts);
        setIsLoading(true);
      }
    })()
  }, [id]);

  return (
    <div data-testid="profile-route">
      <UserProfile 
        name={name}
        avatar={avatar}
        username={username}
      />

      {!isLoading
        ? <Loading />
        : <UserPosts posts={posts} />
      }
    </div>
  );
};

export default ProfileRoute;
