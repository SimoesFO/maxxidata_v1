import { EntityRepository, Repository } from 'typeorm';
import Occupation from '../models/Occupation';

@EntityRepository(Occupation)
class OccupationsRepository extends Repository<Occupation> {}

export default OccupationsRepository;
