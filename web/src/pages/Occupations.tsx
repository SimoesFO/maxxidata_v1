import { AxiosError } from "axios";
import { useState, useEffect, FormEvent } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Header } from '../components/Header';
import api from "../services/api";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import '../styles/pages/occupations.css';

type OccupationsParams = {
  id: string;
}

interface iValidationError {
  [key: string]: string[];
}

export function Occupations() {
  const { id } = useParams<OccupationsParams>();
  const { goBack } = useHistory();
  const history = useHistory();

  const [description, setDescription] = useState('');
  const [situation, setSituation] = useState("true");

  useEffect(() => {
    if(id) {
      api.get(`occupations/${id}`)
        .then(res => {
          setDescription(res.data.description);
          setSituation(res.data.situation);
        });
    }
  }, [id]);

  async function redirectToList(event: FormEvent) {
    event.preventDefault();
    goBack();
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if(id) {
      update();
      return;
    }

    save();
  }

  async function save() {
    const data = {
      description,
      situation: situation === "true",
    };

    await api.post('occupations', data)
      .then(res => handleSuccess('Cadastro realizado com sucesso!'))
      .catch(error => {
        handleErrors(error);
      });
  }

  async function update() {

    const data = {
      id,
      description,
      situation: situation === "true",
    }
    
    await api.put(`occupations/${id}`, data)
      .then(res => handleSuccess('Cadastro atualizado com sucesso!'))
      .catch(error => {
        handleErrors(error);
      });
  }

  async function handleSuccess(message: string) {
    const MySwal = withReactContent(Swal)
    MySwal.fire({
      icon: 'success',
      html: message
    }).then((result) => {

      if (result.isConfirmed) {
        history.push('/occupationslist');
      }
    });
  }
  
  async function handleErrors(errors: AxiosError) {
    const errorsAll = errors.response?.data?.errors as iValidationError[];

    const errorsData = Object.values(errorsAll);
    let messagesErrors = errorsData.join("<br />");

    const MySwal = withReactContent(Swal)
    MySwal.fire({
      icon: 'error',
      title: 'Oops...',
      html: messagesErrors
    })
  }
  
  return (
    <div>
      
      <Header menu='occupations' />

      <main>
        <div className="container">
          <form onSubmit={handleSubmit} className="create-occupations-form">
            <fieldset>
              <legend>Cadastrar Nova Profissão</legend>

              <div className="mb-3">
                <label className="form-label">Descrição:</label>
                <input 
                  type="text" 
                  className="form-control"
                  placeholder="Digite a profissão"
                  value={ description }
                  onChange={ event => setDescription(event.target.value) } />
              </div>

              <div className="mb-3">
                <label className="form-label">Situação:</label>
                <select 
                  className="form-select"
                  value={situation}
                  onChange={ event => setSituation(event.target.value) } >
                  <option value="true">Ativo</option>
                  <option value="false">Inativo</option>
                </select>
              </div>

              <div className="footer">
                <button className="btn btn-secondary" onClick={redirectToList}>Voltar</button>
                <button className="btn btn-primary">Salvar</button>
              </div>
            </fieldset>
          </form>

          <div>
          </div>
        </div>
      </main>
    </div>
  )
}