import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CountryEntity } from "../../entities/country.entity";
import { TranslationEntity } from '../../entities/translation.entity';
import { RegionEntity } from '../../entities/region.entity';
import { RegionsController } from './regions.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RegionEntity,
      CountryEntity,
      TranslationEntity,
    ]),
  ],
  controllers: [
    RegionsController,
  ],
  components: [
  ],
})
export class RegionsModule {
}
