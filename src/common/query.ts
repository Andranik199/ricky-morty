import { gql } from '@apollo/client';
import { GetCharactersFilters } from 'store/characters/actions';

export const generateGetCharactersQuery = (page = 1, filters?: GetCharactersFilters) => {
  let defaultQuery = `page: ${page}`;
  if (filters) {
    defaultQuery += `,filter: { ${Object.keys(filters)
        .filter((key) => !!filters[key as keyof typeof filters])
        .map((key) => `${key}: "${filters[key as keyof typeof filters]}"`)
        .join(',')} }`;
  }

  return gql`
      query GetCharacters {
       characters(${defaultQuery}) {
    info {
      pages
    }
    results {
      id,
      name,
      status,
      species,
      gender,
      image,
      location { name }
    }
  }
      }
    `;
};


export const generateGetSpecificCharacterQuery = (id: string) => {
  return gql`
      query GetCharacterById {
       character(id: ${id}) {
    id
      name
      status
      species
      type
      gender
      image,
      location { name },
      episode{id, name, air_date }
  }
      }
    `;
};
