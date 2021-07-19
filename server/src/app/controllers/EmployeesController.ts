import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import EmployeesRepository from '../repositories/EmployeesRepository';
import OccupationRepository from '../repositories/OccupationsRepository';

export default {
  async index(req: Request, res: Response): Promise<Response> {
    const repository = getCustomRepository(EmployeesRepository);
    const [employees, total] = await repository.findAndCount();

    if (total === 0)
      return res.status(404).json({ message: 'Employees not found.' });

    return res.json({ total, data: employees });
  },

  async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const repository = getCustomRepository(EmployeesRepository);
    const employees = await repository.findOne(id);

    if (!employees)
      return res.status(404).json({ message: 'Employees not found.' });

    return res.json(employees);
  },

  async create(req: Request, res: Response): Promise<Response> {
    const { name, phone, email, situation, occupationId } = req.body;

    const repositoryOccupation = getCustomRepository(OccupationRepository);
    const occupation = await repositoryOccupation.findOne(occupationId);
    if (!occupation)
      return res.status(404).json({ message: 'Occupation not found.' });

    const repository = getCustomRepository(EmployeesRepository);
    const employee = repository.create({
      name,
      phone,
      email,
      situation,
      occupation,
    });

    await repository.save(employee);

    return res.status(201).json(employee);
  },

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const repository = getCustomRepository(EmployeesRepository);
    const employee = await repository.findOne(id, { select: ['id'] });

    if (!employee)
      return res.status(404).json({ message: 'Employees not found.' });

    const repositoryOccupation = getCustomRepository(OccupationRepository);
    const occupation = await repositoryOccupation.findOne(
      req.body.occupationId,
    );

    if (!occupation)
      return res.status(404).json({ message: 'Occupation not found.' });

    const newEmployee = repository.create({
      ...employee,
      ...req.body,
      occupation,
    });

    await repository.save(newEmployee);

    return res.json(newEmployee);
  },

  async destroy(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const repository = getCustomRepository(EmployeesRepository);
    const employees = await repository.findOne(id);

    if (!employees)
      return res.status(404).json({ message: 'Employees not found.' });

    await repository.remove(employees);

    return res.status(204).json(employees);
  },
};
