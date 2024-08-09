import { NestFactory, Reflector } from '@nestjs/core'
import { AppModule } from './app.module'
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common'
import { MultSortInterceptor } from './shared/infrastructure/interceptors/mult-sort.interceptor'
import { NotFoundErrorFilter } from './shared/infrastructure/exception-filters/not-found-error.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  )

  // app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))

  // Aplicando MultiSortInterceptor globalmente
  app.useGlobalInterceptors(new MultSortInterceptor())

  app.useGlobalFilters(new NotFoundErrorFilter())

  app.enableCors({
    origin: 'http://localhost:4200', // Permitir o frontend Angular
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  })

  await app.listen(3000)
}
bootstrap()
