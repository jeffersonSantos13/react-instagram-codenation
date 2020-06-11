import React, { useState, useEffect } from 'react';

import UsersList from '../../containers/UsersList/UsersList';

import api from '../../services/api';

const UsersRoute = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async() => {
      const users = await api.getUsers();
      setUsers(users);
    })();
  }, []);

  return (
    <div className="container" data-testid="users-route">
      <UsersList  users={users} />
    </div>
  );
};

export default UsersRoute;
