import { Module, NestModule, MiddlewareConsumer, Global } from '@nestjs/common';
import { LoggerMiddleware } from './logger.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { runSeeders } from 'typeorm-extension';
import { TypeOrmConfigService } from './data-source';
import { ConfigModule } from '@nestjs/config';
const initialized = process.argv.includes('--initialized');

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options) => {
        const dataSource = new DataSource(options);
        if (initialized) {
          await dataSource.initialize();
          await runSeeders(dataSource);
        }
        return dataSource;
      },
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('user');
  }
}
