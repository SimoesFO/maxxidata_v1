import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import "../styles/components/header.css";

type HeaderProps = {
  children?: string;
  menu?: string;
}

export function Header({ children, menu }: HeaderProps) {
  const { goBack } = useHistory();

  return (
    <aside>
      <div className="goback">
        <button onClick={goBack}>
          <FiArrowLeft size={24} color="#FFF" />
        </button>
      </div>

      <div className="title-menu">
        {children || "Processo Seletivo"}
      </div>

      <div className="container-menus">
        <div>
          <Link to="/">Home</Link>
        </div>
        <div className={menu === 'employees' ? 'active': ''}>
          <Link to="/employeeslist">Profissionais</Link>
        </div>
        <div className={menu === 'occupations' ? 'active': ''}>
          <Link to="/occupationslist">Profissões</Link>
        </div>
      </div>
    </aside>
  )
}