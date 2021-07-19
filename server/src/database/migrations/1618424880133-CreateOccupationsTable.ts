import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateOccupationsTable1618424880133 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

    await queryRunner.createTable(new Table({
      name: 'occupations',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          generationStrategy: 'uuid',
          default: 'uuid_generate_v4()',
        },
        {
          name: 'description',
          type: 'varchar',
        },
        {
          name: 'situation',
          type: 'boolean',
        },
        {
          name: 'created_at',
          type: 'timestamptz',
          isNullable: true,
        },
        {
          name: 'updated_at',
          type: 'timestamptz',
          isNullable: true,
        }
      ],
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('employees_type');
    await queryRunner.query('DROP EXTENSION "uuid-ossp"');
  }
}
