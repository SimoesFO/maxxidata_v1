import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Employee from './Employee';

@Entity('occupations')
class Occupation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column()
  situation: boolean;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @OneToMany(() => Employee, employee => employee.occupation, {
    cascade: true,
  })
  employees: Promise<Employee[]>; // Lazy relations

  @BeforeInsert()
  private setCreatedAt(): void {
    this.createdAt = new Date();
  }
}

export default Occupation;
