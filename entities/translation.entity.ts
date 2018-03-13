import {
  Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CountryEntity } from './country.entity';
import { RegionEntity } from './region.entity';

@Entity({
  name: "translations",
})
export class TranslationEntity {

  static propName = 'translations';

  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { length: 30 })
  value: string;

  @Column("boolean", {
    default: false,
  })
  canonical: boolean = false;

  @ManyToMany(
    type => CountryEntity,
    country => country.translations,
  )
  @JoinTable({
    name: "countries_translations",
  })
  countries: CountryEntity[] = [];

  @ManyToMany(
    type => RegionEntity,
    region => region.translations,
  )
  @JoinTable({
    name: "regions_translations",
  })
  regions: RegionEntity[] = [];
}