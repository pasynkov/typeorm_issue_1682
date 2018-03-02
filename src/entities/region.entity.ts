import {
  Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryColumn,
} from 'typeorm';
import * as uuidv5 from "uuid/v5";
import { IsUUID, Length } from 'class-validator';
import { TranslationEntity } from "./translation.entity";
import { CountryEntity } from './country.entity';
import { IRegionResponse } from '../modules/regions/interfaces/region.interface';

@Entity({
  name: "regions",
})
export class RegionEntity {

  static readonly namespace = uuidv5(RegionEntity.name, uuidv5.URL);

  private _id: string;

  @PrimaryColumn({ type: "uuid" })
  @IsUUID("5")
  get id(): string {
    if (!this._id) this._id = uuidv5(this.code, RegionEntity.namespace);
    return this._id;
  }

  set id(id: string) {
    if (this._id && this._id !== id)
      throw new Error(`You cant set id ${id}. It must be generate as code-based uuidv5`);
  }

  @Column("varchar", { length: 30 })
  @Length(3, 30)
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

  toResponse (): IRegionResponse {

    const response: IRegionResponse = {
      id: this.id,
      country: this.country.code,
      code: this.code,
    };

    if (this.translations.length) {
      const canonical = this.translations.find(t => t.canonical);
      const first = this.translations.find(v => !!v);
      response.name = (canonical && canonical.value) || (first && first.value);
    }

    return response;
  }
}
