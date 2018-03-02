export interface IRegionResponse {
  id: string;
  country: string;
  name?: string;
  code: string;
  timezone?: string;
}

export interface IRegionRequest {
  country: string;
  name?: string;
  names?: {[lang: string]: string};
  code: string;
  timezone?: string;
}
