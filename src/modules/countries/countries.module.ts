import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CountryEntity } from "../../entities/country.entity";
import { CountriesController } from './countries.controller';
import { TranslationEntity } from '../../entities/translation.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CountryEntity,
      TranslationEntity,
    ]),
  ],
  controllers: [
    CountriesController,
  ],
  components: [],
})
export class CountriesModule {
}
