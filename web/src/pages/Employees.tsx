import { AxiosError } from "axios";
import { useState, useEffect, FormEvent} from "react";
import { useHistory, useParams } from "react-router-dom";
import { Header } from '../components/Header';
import api from "../services/api";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import '../styles/pages/employees.css';

type TypeOccupation = {
  id: string;
  description: string;
  situation: boolean;
  created_at: Date;
  updated_at: Date;
}

type EmployeesParams = {
  id: string;
}

interface iValidationError {
  [key: string]: string[];
}

export function Employees() {
  const { goBack } = useHistory();
  const history = useHistory();

  const { id } = useParams<EmployeesParams>();

  const [occupations, setOccupations] = useState<TypeOccupation[]>([]);
  const [occupationId, setOccupationId] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [situation, setSituation] = useState("true");

  useEffect(() => {
      api.get(`occupations`)
        .then(res => {
          setOccupations(res.data.data)
        });
  }, []);

  useEffect(() => {
    if(id) {
      api.get(`employees/${id}`)
        .then(res => {
          setName(res.data.name);
          setPhone(res.data.phone);
          setEmail(res.data.email);
          setSituation(`${res.data.situation}`);
          setOccupationId(res.data.occupation.id)
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
      name,
      phone,
      email,
      occupationId,
      situation: situation === "true",
    };

    await api.post('employees', data)
      .then(res => handleSuccess('Cadastro realizado com sucesso!'))
      .catch(error => {
        handleErrors(error);
      });
  }

  async function update() {

    const data = {
      id,
      name,
      phone,
      email,
      occupationId,
      situation: situation === "true",
    }
    
    await api.put(`employees/${id}`, data)
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
        history.push('/employeeslist');
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
      
      <Header menu='employees' />

      <main>
        <div className="container">
          <form onSubmit={handleSubmit} className="create-occupations-form">
            <fieldset>
              <legend>Cadastrar Novo Profissional</legend>

              <div className="mb-3">
                <label className="form-label">Nome:</label>
                <input 
                  type="text" 
                  className="form-control"
                  placeholder="Digite o nome"
                  value={ name }
                  onChange={ event => setName(event.target.value) } />
              </div>

              <div className="mb-3">
                <label className="form-label">Telefone:</label>
                <input 
                  type="text" 
                  className="form-control"
                  placeholder="Digite o telefone"
                  value={ phone }
                  onChange={ event => setPhone(event.target.value) } />
              </div>

              <div className="mb-3">
                <label className="form-label">E-mail:</label>
                <input 
                  type="text" 
                  className="form-control"
                  placeholder="Digite o email"
                  value={ email }
                  onChange={ event => setEmail(event.target.value) } />
              </div>

              <div className="mb-3">
                <label className="form-label">Profissão:</label>
                  <select 
                    className="form-select"
                    value={occupationId}
                    onChange={ event => setOccupationId(event.target.value) } >
                    <option value="">Escolha uma opção</option>
                    {
                      occupations.map( occupation => {
                        return (
                          <option key={ occupation.id } value={ occupation.id }>{ occupation.description } </option>
                        )
                      })
                    }
                  </select>
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