import { DataSource } from 'typeorm';


const config = {
  type: 'postgres' as const,
  host: '',
  port:'',
  username: '',
  password: '',
  database: '',
  entities: [__dirname + '/../../**/*.entity.{js,ts}'],
  synchronize: false,
  migrations: [__dirname + '/../../migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations_typeorm',
  migrationsRun: true,
};

export const AppDataSource = new DataSource(config);
