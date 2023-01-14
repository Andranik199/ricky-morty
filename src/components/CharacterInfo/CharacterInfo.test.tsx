import { render, screen } from '@testing-library/react';
import { CharacterInfo } from './CharacterInfo';
import { store } from 'store';
import { Provider } from 'react-redux';
import { charactersSelectors } from 'store/characters/config';
import { Gender, Status } from 'store/characters/characters.slice';

const renderComponent = (props: CharacterInfo) => {
  return render(
      <Provider store={store}>
        <CharacterInfo {...props} />
      </Provider>);
};
describe('CharacterInfo component related tests', () => {
  it('CharacterInfo should render properly when visible is false', () => {
    const { container } = renderComponent({ visible: false, handleClose: jest.fn() });
    expect(container.querySelector('#character-info')).toBeNull();
  });

  it('CharacterInfo should render properly when character is selected and episode is undefined', () => {
    jest.spyOn(charactersSelectors, 'selectSpecificCharacter').mockReturnValue({
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
      episode: undefined,
    });
    renderComponent({ visible: true, handleClose: jest.fn() });
    expect(screen.getByTestId('character-info')).not.toBeNull();
  });

  it('CharacterInfo should render properly when character is selected and episode is valid', () => {
    jest.spyOn(charactersSelectors, 'selectSpecificCharacter').mockReturnValue({
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
      episode: [{
        id: '1',
        name: 'Test episode',
        air_date: 'December 2 1997',
      }],
    });
    renderComponent({ visible: true, handleClose: jest.fn() });
    expect(screen.getByTestId('character-info')).not.toBeNull();
  });
});
