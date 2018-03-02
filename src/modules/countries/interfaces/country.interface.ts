export interface ICountryResponse {
  id: string;
  name?: string;
  code: string;
  currency?: string;
}

export interface ICountryRequest {
  name?: string;
  names?: {[lang: string]: string};
  code: string;
  currency: string;
}
