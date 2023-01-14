import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum Gender {
    MALE = 'Male',
    FEMALE = 'Female'
}

export enum Status {
    ALIVE = 'Alive',
    DEAD = 'Dead'
}

type Episode = {
    id: string;
    name: string;
    air_date: string;
}
export type Character = {
    id: string;
    name: string;
    status: Status;
    species: string;
    type: string;
    gender: Gender;
    image: string;
    location: { name: string },
    episode?: Array<Episode>
}
type InitialState = {
    items: Array<Character>;
    totalPages: number;
    isPending: boolean;
    specificCharacter: Character | null;
}
const initialState: InitialState = {
  items: [],
  totalPages: 0,
  isPending: false,
  specificCharacter: null,
};
export const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    setSpecificCharacter: (state, action: PayloadAction<Character>) => {
      return {
        ...state,
        specificCharacter: action.payload,
      };
    },
    setCharactersPendingStatus: (state, action) => {
      return {
        ...state,
        isPending: action.payload,
      };
    },
    setCharacters: (state, action) => {
      return {
        ...state,
        items: action.payload,
      };
    },
    setTotalPages: (state, action) => {
      return {
        ...state,
        totalPages: action.payload,
      };
    },
  },
});
