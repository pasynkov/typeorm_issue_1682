import {
  Column, Entity, JoinTable, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn,
} from 'typeorm';
import { TranslationEntity } from './translation.entity';

@Entity({
  name: 'countries',
})
export class CountryEntity {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column('varchar', { length: 2 })
  code: string;

  @ManyToMany(
    type => TranslationEntity,
    translation => translation.countries,
  )
  @JoinTable({
    name: 'countries_translations',
  })
  translations: TranslationEntity[] = [];

}