import React, { useState, useEffect } from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

import { Container } from './styles';

export default function Logon() {
  const [id, setId] = useState();
  const history = useHistory();

  useEffect(() => {
    const isLogged = localStorage.getItem('@BeTheHero:ongId');

    if (isLogged) {
      history.push('/profile');
    }
  }, [history]);

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const res = await api.post('sessions', { id });

      localStorage.setItem('@BeTheHero:ongId', id);
      localStorage.setItem('@BeTheHero:ongName', res.data.name);

      history.push('/profile');
    } catch (err) {
      toast.error('ID Inválido.');
    }
  }

  return (
    <Container>
      <section className="form">
        <img src={logoImg} alt="Be The Heroe" />

        <form onSubmit={handleLogin}>
          <h1>Faça seu Logon</h1>

          <input
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="Sua ID"
          />
          <button className="button" type="submit">
            Entrar
          </button>

          <Link to="/register" className="back-link">
            <FiLogIn color="#E07C20" size={16} />
            Não tenho cadastro
          </Link>
        </form>
      </section>

      <img src={heroesImg} alt="Be The Heroe" />
    </Container>
  );
}
