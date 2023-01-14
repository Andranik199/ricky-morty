import { Characters } from './Characters';
import { charactersActions, charactersSelectors } from 'store/characters/config';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import * as storeModule from 'store';
import { Gender, Status } from '../../store/characters/characters.slice';
import userEvent from '@testing-library/user-event';

const mockedCharacters = [{
  id: '1',
  name: 'Rick Sanchez',
  status: Status.ALIVE,
  species: 'Human',
  type: '',
  gender: Gender.MALE,
  location: {
    name: 'Test location',
  },
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
}, {
  id: '2',
  name: 'Morty Smith',
  location: {
    name: 'Test location',
  },
  status: Status.ALIVE,
  species: 'Human',
  type: '',
  gender: Gender.MALE,
  image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
}];

const renderComponent = () => {
  return render(
      <Provider store={storeModule.store}>
        <Characters/>
      </Provider>,
  );
};

jest.mock('store', () => ({
  ...jest.requireActual('store'),
  useAppDispatch: jest.fn().mockReturnValue(jest.fn()),
}));

describe('Characters component related tests', () => {
  it('Should render properly if characters is not exist', () => {
    jest.spyOn(charactersSelectors, 'selectCharacters').mockReturnValue([]);
    renderComponent();
    const noCharactersElement = screen.getByTestId('no-characters');
    expect(noCharactersElement).not.toBeNull();
  });

  it('Should render loader properly', () => {
    jest.spyOn(charactersSelectors, 'selectCharactersPendingStatus').mockReturnValue(true);
    renderComponent();
    const loaderComponent = screen.getByTestId('loader');
    expect(loaderComponent).not.toBeNull();
  });

  it('Should render Characters properly when characters is not empty', () => {
    jest.spyOn(charactersSelectors, 'selectCharacters').mockReturnValue(mockedCharacters);
    renderComponent();
    const characterItems = screen.getAllByTestId('characterItem');
    expect(characterItems.length).toEqual(mockedCharacters.length);
  });

  it('Should work properly when next button is clicked', () => {
    const getCharacters = jest.fn();
    jest.spyOn(charactersSelectors, 'selectCharacters').mockReturnValue(mockedCharacters);
    jest.spyOn(charactersSelectors, 'selectPagesCount').mockReturnValue(5);
    jest.spyOn(charactersActions, 'getCharacters').mockImplementation(getCharacters);
    jest.spyOn(storeModule, 'useAppDispatch').mockReturnValue(() => Promise.resolve());
    renderComponent();
    const nextPageButton = screen.getByRole('button', {
      name: 'Go to next page',
    });
    userEvent.click(nextPageButton);
    expect(getCharacters).toHaveBeenCalledTimes(2);
  });
});
