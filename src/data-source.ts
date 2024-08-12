
import { User } from './entity/user.entity';
import { ConfigService } from '@nestjs/config';

import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { SeederOptions } from 'typeorm-extension';
import UserSeeder from './seeds/user.seeder';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  public createTypeOrmOptions(): TypeOrmModuleOptions & SeederOptions {

    // const mysqlSettings = {
    //   type: 'mysql',
    //   host: 'localhost',
    //   port: 3306,
    //   username: this.configService.get<string>('MYSQL_ROOT_USER'),
    //   password: this.configService.get<string>('MYSQL_ROOT_PASSWORD'),
    //   database: this.configService.get<string>('MYSQL_DATABASE'),
    //   entities: [User], // use entites
    //   synchronize: true,
    //   seeds: [UserSeeder],
    // };



    return {
      type: 'sqlite', // SQLiteを指定
      database: this.configService.get<string>('SQLITE_DATABASE') || 'database.sqlite', // SQLite用のデータベースファイルを指定
      entities: [User], // 使用するエンティティを指定
      synchronize: true, // 開発中にのみ使用（本番環境では使用しない）
      seeds: [UserSeeder], // 使用するシーダーを指定
    };
  }
}
