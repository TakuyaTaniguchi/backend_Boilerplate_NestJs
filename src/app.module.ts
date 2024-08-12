import { Module, NestModule, MiddlewareConsumer, Global } from '@nestjs/common';
import { LoggerMiddleware } from './logger.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { runSeeders } from 'typeorm-extension';
import { TypeOrmConfigService } from './data-source';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';

// SQLiteデータベースファイルのパスを取得
const configService = new ConfigService();
const databasePath = configService.get<string>('SQLITE_DATABASE') || 'database.sqlite';
// データベースファイルが存在しない場合にのみ初期化を行う
const initialized = !fs.existsSync(path.resolve(databasePath));




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
