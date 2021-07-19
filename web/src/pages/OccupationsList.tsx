import { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { Header } from '../components/Header';
import api from "../services/api";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import '../styles/pages/occupations-list.css';

type TypeOccupation = {
  id: string;
  description: string;
  situation: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export function OccupationsList() {
  const history = useHistory();

  const [occupations, setOccupations] = useState<TypeOccupation[]>([]);

  function redirectToOccupations() {
    history.push("/occupations");
  }


  useEffect(() => {
    api.get('occupations')
      .then(res => {
        setOccupations(res.data.data);
      })
      .catch(error => {
        console.log(error.response.data.message);
      });
  }, []);


  async function remove(id: string) {

    api.delete(`occupations/${id}`)
      .then(res => {
        api.get('occupations')
          .then(res => {
            setOccupations(res.data.data);
          });

          handleSuccess("Profissão excluída com Sucesso");
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
      
      <Header menu='occupations' />

      <main>
        <div className="container">
          <div className="actions">
            <h3>Lista de Profissões Cadastradas</h3>
            <button className="btn btn-primary" onClick={redirectToOccupations}>Novo</button>
          </div>

          <div>
            <table className="table table-striped table-hover" width="100%">
              <thead>
                <tr>
                  <th>Descrição</th>
                  <th className="td-center">Situação</th>
                  <th className="td-center">Editar</th>
                  <th className="td-center">Excluir</th>
                </tr>
              </thead>
              <tbody>
                {
                  occupations.length === 0 
                    ? <tr><td colSpan={4} align='center'>Nenhuma profissão cadastrada</td></tr>
                    : occupations.map( occupation => {
                      return (
                        <tr key={ occupation.id }>
                          <td>{ occupation.description }</td>
                          <td className="td-center">{ occupation.situation ? 'Ativa' : 'Inativa' }</td>
                          <td className="td-center">
                            <Link to={`/occupations/${occupation.id}`} className="btn btn-sm btn-success">
                              Editar
                            </Link>
                          </td>
                          <td className="td-center">
                            <button className="btn btn-sm btn-danger" onClick={ () => remove(occupation.id) }>
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