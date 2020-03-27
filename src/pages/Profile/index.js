import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import { toast } from 'react-toastify';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

import { Container } from './styles';

export default function Profile() {
  const [incidents, setIncidents] = useState([]);

  const ongName = localStorage.getItem('@BeTheHero:ongName');
  const ongId = localStorage.getItem('@BeTheHero:ongId');

  const history = useHistory();

  useEffect(() => {
    api
      .get('/profile', {
        headers: {
          authorization: ongId,
        },
      })
      .then((res) => {
        setIncidents(res.data);
      });
  }, [ongId]);

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: { authorization: ongId },
      });

      setIncidents(incidents.filter((incident) => incident.id !== id));

      toast.success('Caso deletado com Sucesso.');
    } catch (err) {
      toast.error('Você não tem permissão para deletar');
    }
  }

  function handleLogout() {
    localStorage.clear();

    history.push('/');
  }

  return (
    <Container>
      <header>
        <img src={logoImg} alt="Be The Hero" />
        <span>Bem vinda, {ongName}</span>

        <Link to="/incidents/new" className="button">
          Cadastrar novo caso
        </Link>

        <button type="button" onClick={handleLogout}>
          <FiPower size={18} color="#E07C20" />
        </button>
      </header>

      <h1>Casos cadastrados</h1>

      <ul>
        {incidents.map((incident) => (
          <li key={incident.id}>
            <strong>Caso:</strong>
            <p>{incident.title}</p>

            <strong>Descrição:</strong>
            <p>{incident.description}</p>

            <strong>Valor:</strong>
            <p>
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(incident.value)}
            </p>

            <button
              type="button"
              onClick={() => handleDeleteIncident(incident.id)}
            >
              <FiTrash2 size={20} color="#999" />
            </button>
          </li>
        ))}

        {incidents.length === 0 && <p>Você não tem nenhum caso cadastrado.</p>}
      </ul>
    </Container>
  );
}
