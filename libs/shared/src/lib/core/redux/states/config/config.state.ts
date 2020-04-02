import {State, Action, Selector, StateContext, createSelector} from '@ngxs/store';

import {SetConfigAction} from './config.actions';

export interface ConfigStateModel {
  configurations: {[key: string]: any};
}

@State<ConfigStateModel>({
  name: 'config',
  defaults: {
    configurations: {}
  }
})
export class ConfigState {

  @Selector()
  public static getConfigurations(state: ConfigStateModel): {[key: string]: any} {
    return state.configurations;
  }

  public static getConfigItem(key: string) {
    return createSelector([ConfigState], (state: ConfigStateModel) => {
      return state.configurations[key];
    });
  }

  @Action(SetConfigAction)
  public setConfigAction(ctx: StateContext<ConfigStateModel>, action: SetConfigAction) {
    const configurations = {...ctx.getState().configurations};
    configurations[action.key] = action.value;
    ctx.patchState({configurations});
  }
}
