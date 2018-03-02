import {
  Column, Entity, JoinTable, ManyToMany, PrimaryColumn,
} from 'typeorm';
import * as uuidv5 from 'uuid/v5';
import { IsUppercase, IsUUID, Length } from 'class-validator';
import { TranslationEntity } from './translation.entity';
import { ICountryResponse } from '../modules/countries/interfaces/country.interface';

@Entity({
  name: 'countries',
})
export class CountryEntity {

  static readonly namespace = uuidv5(CountryEntity.name, uuidv5.URL);

  private _id: string;

  @PrimaryColumn({ type: 'uuid' })
  @IsUUID('5')
  get id(): string {
    if (!this._id) this._id = uuidv5(this.code, CountryEntity.namespace);
    return this._id;
  }

  set id(id: string) {
    if (this._id && this._id !== id)
      throw new Error(`You cant set id ${id}. It must be generate as code-based uuidv5`);
  }

  @Column('varchar', { length: 2 })
  @IsUppercase()
  @Length(2, 2)
  code: string;

  @ManyToMany(
    type => TranslationEntity,
    translation => translation.countries,
  )
  @JoinTable({
    name: 'countries_translations',
  })
  translations: TranslationEntity[] = [];

  toResponse(): ICountryResponse {

    const response: ICountryResponse = {
      id: this.id,
      code: this.code,
    };

    if (this.translations.length) {
      const canonical = this.translations.find(t => t.canonical);
      const first = this.translations.find(v => !!v);
      response.name = ( canonical && canonical.value ) || ( first && first.value );
    }

    return response;
  }
}