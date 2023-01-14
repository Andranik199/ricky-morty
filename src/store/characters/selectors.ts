import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../index';


const CharacterSelector = (state: RootState) => state.characters;

export const selectCharacters = createSelector(CharacterSelector, (state) => state.items || []);
export const selectPagesCount = createSelector(CharacterSelector, (state) => state.totalPages);
export const selectCharactersPendingStatus = createSelector(CharacterSelector, (state) => state.isPending);
export const selectSpecificCharacter = createSelector(CharacterSelector, (state) => state.specificCharacter);
