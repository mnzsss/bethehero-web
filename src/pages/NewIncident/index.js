import React, { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

import { Container } from './styles';

export default function NewIncident() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');

  const history = useHistory();
  const ongId = localStorage.getItem('@BeTheHero:ongId');

  async function handleNewIncident(e) {
    e.preventDefault();

    try {
      await api.post(
        '/incidents',
        { title, description, value },
        { headers: { authorization: ongId } }
      );

      toast.success('Caso cadastrado!');

      history.push('/profile');
    } catch (err) {
      toast.error('Verifique se preencheu todos os campos.');
    }
  }

  return (
    <Container>
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Heroe" />

          <h1>Cadastrar novo caso</h1>

          <p>
            Descreva o caso detalhadamente para encontrar um herói para resolver
            isso.
          </p>

          <Link to="/profile" className="back-link">
            <FiArrowLeft color="#E07C20" size={16} />
            Voltar para home
          </Link>
        </section>

        <form onSubmit={handleNewIncident}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título do Caso"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descrição"
          />
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Valor em reais"
          />

          <button type="submit" className="button">
            Cadastrar
          </button>
        </form>
      </div>
    </Container>
  );
}
