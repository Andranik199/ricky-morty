import { AnyAction, configureStore, ThunkDispatch } from '@reduxjs/toolkit';

import { ApolloClient, DocumentNode, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { charactersSlice } from './characters/characters.slice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export type Query = <QV, RT>(name: string, query: DocumentNode, variables?: QV) => Promise<RT>;

export type GraphQLClient = {
    query: Query;
};

export const createGQLClient = (): GraphQLClient => {
  const cache = new InMemoryCache({
    addTypename: false,
    resultCaching: false,
  });

  const client = new ApolloClient({
    // Provide required constructor fields
    cache: cache,
    link: createUploadLink({
      uri: 'https://rickandmortyapi.com/graphql',
      includeUnusedVariables: false,
      credentials: 'include',
    }),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'no-cache',
      },
      mutate: {
        fetchPolicy: 'no-cache',
      },
    },
  });

  const query: Query = (name, query, variables) => {
    return client
        .query({
          query,
          variables,
          fetchPolicy: 'no-cache',
        })
        .then(({ data }) => data[name]);
  };


  return { query };
};

export const store = configureStore({
  reducer: {
    [charactersSlice.name]: charactersSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      thunk: { extraArgument: createGQLClient() },
    });
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;
export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
