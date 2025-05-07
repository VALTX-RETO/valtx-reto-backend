import { Module } from '@nestjs/common';
import { envs } from './config';

import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { ProductsModule } from './products/products.module';

@Module({
  imports: [
        AuthModule
        ,ProductsModule
        ,TypeOrmModule.forRoot({
            type               : 'mssql',
            host               : envs.db.host,
            port               : envs.db.port,
            username           : envs.db.username,
            password           : envs.db.password,
            database           : envs.db.database,
            entities           : [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize        : true,
            options: {
                encrypt          : false,
                trustServerCertificate: envs.db.trustCert,
            },
        }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'uploads'),
            serveRoot: '/uploads',
        }),
    ],
})
export class AppModule {}
