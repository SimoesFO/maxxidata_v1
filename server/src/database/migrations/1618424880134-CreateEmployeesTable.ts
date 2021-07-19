import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateEmployeesTable1618424880134 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

    await queryRunner.createTable(new Table({
      name: 'employees',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          generationStrategy: 'uuid',
          default: 'uuid_generate_v4()',
        },
        {
          name: 'name',
          type: 'varchar',
        },
        {
          name: 'phone',
          type: 'varchar',
        },
        {
          name: 'email',
          type: 'varchar'
        },
        {
          name: 'situation',
          type: 'boolean',
        },
        {
          name: 'occupations_id',
          type: 'uuid',
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
      foreignKeys: [
        {
          name: 'occupationsId',
          referencedTableName: 'occupations',
          referencedColumnNames: ['id'],
          columnNames: ['occupations_id'],
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        }
      ]
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('employees');
    await queryRunner.query('DROP EXTENSION "uuid-ossp"');
  }
}
