import {
  BadRequestException, Body, Controller, Get, HttpCode, HttpStatus, Logger, Param, Post,
  Req,
} from '@nestjs/common';
import { CountryEntity } from '../../entities/country.entity';
import { ICountryRequest, ICountryResponse } from './interfaces/country.interface';
import { TranslationEntity } from '../../entities/translation.entity';
import { getManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Controller('countries')
export class CountriesController {

  private logger = new Logger('Country', true);


  constructor (
    @InjectRepository(CountryEntity)
    private readonly countryRepository: Repository<CountryEntity>,

    @InjectRepository(TranslationEntity)
    private readonly translationRepository: Repository<TranslationEntity>,
  ) {
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(
    @Body() countryRequest: ICountryRequest,
  ): Promise<ICountryResponse> {
    const country = new CountryEntity();
    country.code = countryRequest.code;

    if (await this.countryRepository.findOneById(country.id)) {
      throw new BadRequestException(`Country with that code already exists`);
    }

    const t = new TranslationEntity();
    t.value = countryRequest.name;
    country.translations = [t];

    try {
      await getManager().transaction(async (transactionalEntityManager) => {
        const alreadyExists = await transactionalEntityManager.findOneById(
          CountryEntity,
          country.id,
        );
        if (!alreadyExists) {
          await transactionalEntityManager.save(country.translations);
          await transactionalEntityManager.save(country);
        } else {
          throw new BadRequestException(`Country with that code already exists`);
        }

      });

      return country.toResponse();
    } catch (e) {
      this.logger.error(`Create country transaction error: ${JSON.stringify(e, null, ' ')}`);
      throw e;
    }
  }

}
