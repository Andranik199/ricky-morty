import { generateGetCharactersQuery, generateGetSpecificCharacterQuery } from 'common/query';
import { charactersActions } from './config';
import { Query, RootState } from '../index';
import { ThunkAction } from '@reduxjs/toolkit';
import { Character } from './characters.slice';

type CharactersResponse = {
    results: Array<Character>;
    info: {
        pages: number;
    }
}
type Thunk = ThunkAction<void, RootState, { query: Query }, any>
export type GetCharactersFilters = Partial<{
    status: string;
    name: string;
}>
export const getCharacters = (page = 1, filters?: GetCharactersFilters): Thunk => (dispatch, getState, { query }) => {
  dispatch(charactersActions.setCharactersPendingStatus(true));
  query<unknown, CharactersResponse>('characters', generateGetCharactersQuery(page, filters))
      .then((response) => {
        dispatch(charactersActions.setCharacters(response.results));
        dispatch(charactersActions.setTotalPages(response.info.pages));
      }).finally(() => dispatch(charactersActions.setCharactersPendingStatus(false)));
};


export const getCharacterById = (id: string): Thunk => (dispatch, getState, { query }) => {
  query<unknown, Character>('character', generateGetSpecificCharacterQuery(id)).then((res) => {
    dispatch(charactersActions.setSpecificCharacter(res));
  });
};
