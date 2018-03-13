import {
  Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn,
} from 'typeorm';
import { TranslationEntity } from "./translation.entity";
import { CountryEntity } from './country.entity';

@Entity({
  name: "regions",
})
export class RegionEntity {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar", { length: 30 })
  code: string;

  @ManyToMany(
    type => TranslationEntity,
    translation => translation.regions,
  )
  @JoinTable({
    name: "regions_translations",
  })
  translations: TranslationEntity[];

  @OneToOne(
    type => CountryEntity,
    { eager: true },
  )
  @JoinColumn()
  country: CountryEntity;
}
