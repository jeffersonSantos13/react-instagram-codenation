import React, { useState } from 'react';

import SuccessMessage from '../../components/SuccessMessage';

import api from '../../services/api';

import './UserForm.scss';

const UserForm = () => {
  const [name, setName] = useState('John Doe');
  const [avatar, setAvatar] = useState('');
  const [username, setUsername] = useState('johndoe');
  const [email, setEmail] = useState('johndoe@gmail.com');
  const [submit, setSubmit] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const user = JSON.stringify({
      name,
      avatar,
      username,
      email,
    });

    const data = await api.postUser(user);
    
    if (data) {
      setSubmit(true);
    }
  };

  return (
    <React.Fragment>
      <section className="profile" data-testid="user-form">
        <div className="container">
          <div className="profile-data">
            <div className="user">
              <div className="user__thumb">
                {avatar
                  ? <img src={avatar} alt="" />
                  : <img src="https://viniciusvinna.netlify.app/assets/api-instagram/profiles/profile-placeholder.png" alt="" />
                }
              </div>

              {name && (
                <p className="user__name">
                  {name}
                  <span>@{username}</span>
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="post__form">
        <div className="container">
          <div className="post__form__wrapper">
            <label>Nome</label>
            <input
              type="text"
              placeholder="Ex: Fulado da Silva"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />

            <label>Usuário</label>
            <input 
              type="text"
              placeholder="Ex: fulano_da_silva"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />

            <label>Email</label>
            <input 
              type="email"
              placeholder="Ex: fulano@provedor.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />

            <label>Url da Imagem de Perfil (use a url da imagem do Linkedin)</label>
            <input 
              type="text"
              placeholder="http://..."
              onChange={(event) => setAvatar(event.target.value)}
            />

            <button 
              type="button"
              onClick={(event) => handleSubmit(event)}
            >
              Cadastrar
            </button>
          </div>
        </div>
      </section>

      {submit && (<SuccessMessage />)}
    </React.Fragment>
  );
};

export default UserForm;
