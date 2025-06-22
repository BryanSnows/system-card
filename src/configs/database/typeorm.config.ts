import { DataSource } from 'typeorm';


const config = {
  type: 'postgres' as const,
  host: 'localhost',
  port: parseInt('5432'),
  username: 'postgres',
  password: 'pass123',
  database: 'postgres',
  entities: [__dirname + '/../../**/*.entity.{js,ts}'],
  synchronize: false,
  migrations: [__dirname + '/../../migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations_typeorm',
  migrationsRun: true,
};

export const AppDataSource = new DataSource(config);
