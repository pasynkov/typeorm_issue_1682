import { createConnection, getManager } from 'typeorm';
import { CountryEntity } from './entities/country.entity';
import { RegionEntity } from './entities/region.entity';
import { TranslationEntity } from './entities/translation.entity';

(async () => {

  const connection = await createConnection();

  const countryRepository = connection.getRepository(CountryEntity);
  const regionRepositoty = connection.getRepository(RegionEntity);
  const translationRepository = connection.getRepository(TranslationEntity);

  await countryRepository.remove(
    await countryRepository.find(),
  );

  await regionRepositoty.remove(
    await regionRepositoty.find(),
  );

  await translationRepository.remove(
    await translationRepository.find(),
  );

  await (async () => {
    const country = new CountryEntity();
    const t = new TranslationEntity();
    country.code = 'MM';
    t.value = 'MM';
    country.translations = [t];

    await getManager().transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager.save(country.translations);
      await transactionalEntityManager.save(country);
    });
  })();

  await (async () => {
    const region = new RegionEntity();
    const t = new TranslationEntity();
    region.code = 'MMR';
    t.value = 'MMR';
    region.translations = [t];

    await getManager().transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager.save(region.translations);
      await transactionalEntityManager.save(region);
    });
  })();

})();