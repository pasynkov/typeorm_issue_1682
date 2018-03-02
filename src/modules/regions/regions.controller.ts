import { BadRequestException, Body, Controller, Get, HttpCode, HttpStatus, Logger, Param, Post } from '@nestjs/common';
import { IRegionRequest, IRegionResponse } from './interfaces/region.interface';
import { RegionEntity } from '../../entities/region.entity';
import { TranslationEntity } from '../../entities/translation.entity';
import { getManager, Repository } from 'typeorm';
import { CountryEntity } from '../../entities/country.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Controller('regions')
export class RegionsController {

  private logger = new Logger('Region', true);

  constructor (
    @InjectRepository(CountryEntity)
    private readonly countryRepository: Repository<CountryEntity>,

    @InjectRepository(RegionEntity)
    private readonly regionRepository: Repository<RegionEntity>,

    @InjectRepository(TranslationEntity)
    private readonly translationRepository: Repository<TranslationEntity>,
  ) {

  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(
    @Body() regionRequest: IRegionRequest,
  ): Promise<IRegionResponse> {
    const region = new RegionEntity();
    region.code = regionRequest.code;

    if (await this.regionRepository.findOneById(region.id)) {
      throw new BadRequestException(`Region with that code already exists`);
    }

    const t = new TranslationEntity();
    t.value = regionRequest.name;
    region.translations = [t];

    try {
      await getManager().transaction(async (transactionalEntityManager) => {
        const alreadyExists = await transactionalEntityManager.findOneById(
          RegionEntity,
          region.id,
        );
        if (!alreadyExists) {
          await transactionalEntityManager.save(region.translations);
          await transactionalEntityManager.save(region);
        } else {
          throw new BadRequestException(`Region with that code already exists`);
        }

      });

      return region.toResponse();
    } catch (e) {
      this.logger.error(`Create region transaction error: ${JSON.stringify(e, null, ' ')}`);
      throw e;
    }
  }

}
