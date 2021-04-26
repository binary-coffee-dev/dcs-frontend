import { State, Action, Selector, StateContext } from '@ngxs/store';

import { tap } from 'rxjs/operators';

import { FetchAdAction, FetchCurrentGeoLocationAction } from './ad.actions';
import { GEOLocationService } from './geolocation.service';
import { Ad, GeoLocationResponse } from '../../models';

export interface AdStateModel {
  geoLocation: GeoLocationResponse;
  ads: Ad[];
}

@State<AdStateModel>({
  name: 'ad',
  defaults: {
    geoLocation: {} as GeoLocationResponse,
    ads: []
  }
})
export class AdState {

  @Selector()
  public static getAds(state: AdStateModel): Ad[] {
    return state.ads;
  }

  constructor(private geoLocationService: GEOLocationService) {
  }

  @Action(FetchCurrentGeoLocationAction)
  public fetchCurrentGeoLocationAction(ctx: StateContext<AdStateModel>) {
    return this.geoLocationService.getGEOLocation().pipe(
      tap((geoLocation: GeoLocationResponse) => ctx.patchState({geoLocation}))
    );
  }

  @Action(FetchAdAction)
  public fetchAdAction(ctx: StateContext<AdStateModel>) {
    return this.geoLocationService.getAds(ctx.getState().geoLocation.country_code)
      .pipe(tap(ads => ctx.patchState({ads})));
  }
}
