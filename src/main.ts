import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';


import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { envs } from './config';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

async function bootstrap() {
    const logger = new Logger('Microservice');

    const app = await NestFactory.create(AppModule, {
        rawBody: true
    });
    
    app.setGlobalPrefix('api');

    app.use(helmet());
    app.use(rateLimit({ windowMs: 60_000, max: 100 }));

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
        })
    );

    app.enableCors();

     // --- SWAGGER SETUP ---
    const config = new DocumentBuilder()
    .setTitle('Mi API FullStack')
    .setDescription('Documentación de la API de autenticación y productos')
    .setVersion('1.0')
    
    .addBearerAuth(
        { 
            type: 'http', 
            scheme: 'bearer', 
            bearerFormat: 'JWT',
            name: 'Authorization',
            description: 'Pon aquí tu token JWT',
            in: 'header',
        },
        'JWT-auth',
    )
    .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
    // --- FIN SWAGGER SETUP ---

    await app.startAllMicroservices();

    await app.listen( envs.port );

    logger.log(`Microservice running on port ${ envs.port }`);
}
bootstrap();
