const URL = 'https://5e7d0266a917d70016684219.mockapi.io/api/v1';

const api = {
  async getUsers() {
    const api = await fetch(`${URL}/users`);
    return api.json();
  },

  async getStories() {
    const api = await fetch(`${URL}/stories`);
    return api.json();
  },

  async getUser(username) {
    const api = await fetch(`${URL}/users?search=${username}`);
    return api.json();
  },

  async getPosts(id) {
    const api = await fetch(`${URL}/users/${id}/posts`);
    return api.json();
  },

  async postUser(user) {
    const api = await fetch(`${URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: user,
    });

    return api.json();
  }

}

export default api;
