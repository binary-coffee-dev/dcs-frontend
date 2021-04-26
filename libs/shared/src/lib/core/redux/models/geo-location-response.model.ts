export interface GeoLocationResponse {
  ip: string;
  type: string;
  continent_code: string;
  continent_name: string;
  // this one
  country_code: string;
  country_name: string;
  region_code: string;
  region_name: string;
  city: string;
  zip: string;
  latitude: number;
  longitude: number;
  location: {
    geoname_id: number;
    capital: string;
    languages: [
      {
        code: string;
        name: string;
        native: string
      }
    ];
    country_flag: string;
    country_flag_emoji: string;
    country_flag_emoji_unicode: string;
    calling_code: string;
    is_eu: boolean
  };
}
