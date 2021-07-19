import { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { Header } from '../components/Header';
import api from "../services/api";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import '../styles/pages/employees-list.css';

type TypeOccupation = {
  id: string;
  description: string;
  situation: boolean;
  createdAt: Date;
  updatedAt: Date;
}

type TypeEmployees = {
  id: string;
  name: string;
  phone: string;
  email: string;
  situation: boolean;
  occupation: TypeOccupation;
  createdAt: Date;
  updatedAt: Date;
}

export function EmployeesList() {
  const history = useHistory();

  const [employees, setEmployees] = useState<TypeEmployees[]>([]);

  function redirectToEmployees() {
    history.push("/employees");
  }

  useEffect(() => {
    api.get('employees')
      .then(res => {
        setEmployees(res.data.data);
      })
      .catch(error => {
        console.log(error.response.data.message);
      });
  }, []);

  async function remove(id: string) {

    api.delete(`employees/${id}`)
      .then(res => {
        api.get('employees')
          .then(res => {
            setEmployees(res.data.data);
          })
          .catch(error => {
            setEmployees([]);
          });

          handleSuccess("Profissional excluído com Sucesso");
      });
  }

  async function handleSuccess(message: string) {
    const MySwal = withReactContent(Swal)
    MySwal.fire({
      icon: 'success',
      html: message
    });
  }

  return (
    <div>
      
      <Header menu='employees' />

      <main>
        <div className="container">
          <div className="actions">
            <h3>Lista de Profissionais Cadastrados</h3>
            <button className="btn btn-primary" onClick={redirectToEmployees}>Novo</button>
          </div>

          <div>
            <table className="table table-striped table-hover" width="100%">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th className="td-center">Telefone</th>
                  <th>E-mail</th>
                  <th>Profissão</th>
                  <th className="td-center">Situação</th>
                  <th className="td-center">Editar</th>
                  <th className="td-center">Excluir</th>
                </tr>
              </thead>
              <tbody>
              {
                employees.length === 0 
                  ? <tr><td colSpan={7} align='center'>Nenhum profissional cadastrado</td></tr>
                  : employees.map( employee => {
                    return (
                      <tr key={ employee.id }>
                        <td>{ employee.name }</td>
                        <td className="td-center">{ employee.phone }</td>
                        <td>{ employee.email }</td>
                        <td>{ employee.occupation.description }</td>
                        <td className="td-center">{ employee.situation ? 'Ativa' : 'Inativa' }</td>
                        <td className="td-center">
                          <Link to={`/employees/${employee.id}`} className="btn btn-sm btn-success">
                            Editar
                          </Link>
                        </td>
                        <td className="td-center">
                          <button className="btn btn-sm btn-danger" onClick={ () => remove(employee.id) }>
                            Excluir
                          </button>
                        </td>
                      </tr>
                    )
                  })
              } 
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}