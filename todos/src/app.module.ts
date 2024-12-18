import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Todo } from './todo.entity';

@Module({
  imports: [
    ConfigModule.forRoot(), // Loads the .env file
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Ensure ConfigModule is available
      inject: [ConfigService],  // Inject ConfigService into the factory function
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: 'dpg-ctgtoijv2p9s73bu0sr0-a.oregon-postgres.render.com',
        port: 5432, // Port should be a number, not a string
        username: 'juanc',
        password: 'WVodBEsuelBG1whvrXKrTbw3blwQatky',
        database: 'taskmanager_9us9',
        entities: [Todo], // Specify your entities here
        synchronize: true, // Auto-sync database schema (disable in production)
        ssl: {
          rejectUnauthorized: false, // Allow connections to servers with self-signed certificates (adjust based on your needs)
        },
      }),
    }),
    TypeOrmModule.forFeature([Todo]), // Register User repository in the current module
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
