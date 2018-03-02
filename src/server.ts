import { NestFactory } from "@nestjs/core";
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegionsModule } from './modules/regions/regions.module';
import { CountriesModule } from './modules/countries/countries.module';
import { Module } from '@nestjs/common';

@Module({
  modules: [
    TypeOrmModule.forRoot(),
    CountriesModule,
    RegionsModule,
  ],
})
class ApplicationModule {}

const {
  PORT = 3001,
} = process.env;

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  await app.listen(+PORT);
}

bootstrap();
