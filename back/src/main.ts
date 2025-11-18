import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGlobal } from './middleware/loggerGlobal';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(loggerGlobal);
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

    const options = new DocumentBuilder()
        .setTitle('CAMPOX - API REST')
        .setDescription(
            'Descripción de la API REST de CAMPOX, una plataforma para la gestión agrícola.',
        )
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document, {
        swaggerOptions: {
            persistAuthorization: true,
        },
    }); // ruta http://localhost:3002/api

    await app.listen(process.env.PORT ?? 3002);
    console.log('Servidor corriendo en el puerto 3002');
}
bootstrap();
