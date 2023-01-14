import { create } from 'react-test-renderer';
import { CharacterItem } from './CharacterItem';
import { Gender, Status } from 'store/characters/characters.slice';

it('CharacterItem component should render properly', () => {
  const component = create(<CharacterItem item={{
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
  }} handleSelect={jest.fn()}/>);
  expect(component.toJSON()).toMatchSnapshot();
});
