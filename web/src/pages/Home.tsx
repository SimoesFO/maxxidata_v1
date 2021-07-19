import { useHistory } from "react-router-dom";
import logo from "../assets/images/home.png";
import "../styles/pages/home.css";

export function Home() {
  const history = useHistory();

  function redirectToOccupationList() {
    history.push("/occupationslist");
  }
  return (
    <div className="container-main">
      <div className="container-left">
        <h1>Processo Seletivo MaxxiData</h1>
        <h3>Teste prático para o cargo de desenvolvedor da MaxxiData.</h3>
        <button onClick={redirectToOccupationList}>Entrar</button>
      </div>

      <div className="container-right">
        <img src={logo} title="React" alt="React" />
      </div>
    </div>
  )
}