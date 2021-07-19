import { BrowserRouter, Route } from "react-router-dom";
import { Employees } from "./pages/Employees";
import { EmployeesList } from "./pages/EmployeesList";
import { Home } from "./pages/Home";
import { Occupations } from "./pages/Occupations";
import { OccupationsList } from "./pages/OccupationsList";

export function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" component={Home} exact />
      <Route path="/employeeslist" component={EmployeesList} exact />
      <Route path="/employees" component={Employees} exact />
      <Route path="/employees/:id" component={Employees} />
      <Route path="/occupationslist" component={OccupationsList} />
      <Route path="/occupations" component={Occupations} exact />
      <Route path="/occupations/:id" component={Occupations} />
    </BrowserRouter>
  )
}