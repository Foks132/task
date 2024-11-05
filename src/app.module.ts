import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';

@Module({
  imports: [UsersModule, TypeOrmModule.forRoot({
    type: 'mariadb',
    host: '81.31.247.100',
    port: 3306,
    username: 'uazPBI',
    password: 'AgXQistIcKKjnXAg',
    database: 'rACnoyZh',
    entities: [User],
    synchronize: true
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
