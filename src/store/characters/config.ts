import { charactersSlice } from './characters.slice';
import * as actions from './actions';


export const charactersActions = {
  ...charactersSlice.actions,
  ...actions,
};


export * as charactersSelectors from './selectors';
