import { EntityRepository, Repository } from 'typeorm';
import Employee from '../models/Employee';

@EntityRepository(Employee)
class EmployeesRepository extends Repository<Employee> {}

export default EmployeesRepository;
