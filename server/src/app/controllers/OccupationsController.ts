import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import Occupation from '../models/Occupation';
import OccupationsRepository from '../repositories/OccupationsRepository';

export default {
  async index(req: Request, res: Response): Promise<Response> {
    const repository = getCustomRepository(OccupationsRepository);
    const [employeesType, total] = await repository.findAndCount();

    if (total === 0)
      return res.status(404).json({ message: 'Occupations not found.' });

    return res.json({ total, data: employeesType });
  },

  async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const repository = getCustomRepository(OccupationsRepository);
    const employeesType = await repository.findOne(id);

    if (!employeesType)
      return res.status(404).json({ message: 'Occupations not found.' });

    return res.json(employeesType);
  },

  async create(req: Request, res: Response): Promise<Response> {
    const data = req.body as Occupation;

    const repository = getCustomRepository(OccupationsRepository);
    const employeesType = repository.create(data);
    await repository.save(employeesType);

    return res.status(200).json(employeesType);
  },

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const repository = getCustomRepository(OccupationsRepository);
    const employeesType = await repository.findOne(id, { select: ['id'] });

    if (!employeesType)
      return res.status(404).json({ message: 'Occupations not found.' });

    const newEmployeeType = repository.create({
      ...employeesType,
      ...req.body,
    } as Occupation);
    await repository.save(newEmployeeType);

    return res.json(newEmployeeType);
  },

  async destroy(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const repository = getCustomRepository(OccupationsRepository);
    const employeesType = await repository.findOne(id);

    if (!employeesType)
      return res.status(404).json({ message: 'Occupations not found.' });

    await repository.remove(employeesType);

    return res.status(204).json(employeesType);
  },
};
