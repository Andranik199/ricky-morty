import React, { useCallback, useEffect, useState } from 'react';
import { charactersActions, charactersSelectors } from 'store/characters/config';
import { CharacterItem } from 'components/CharacterItem/CharacterItem';
import { Pagination } from '@mui/material';
import { Loader } from 'components/Loader/Loader';
import { useAppDispatch, useAppSelector } from 'store';
import { CharacterInfo } from 'components/CharacterInfo/CharacterInfo';
import { Filters } from 'components/Filters/Filters';
import styles from './Characters.module.scss';
import { useActionDelay } from '../../common/hooks';

export const Characters: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useAppDispatch();
  const [selectedStatus, setSelectedStatus] = useState('');
  const characters = useAppSelector(charactersSelectors.selectCharacters);
  const totalPages = useAppSelector(charactersSelectors.selectPagesCount);
  const isPending = useAppSelector(charactersSelectors.selectCharactersPendingStatus);
  const search = useCallback((value: string) => {
    dispatch(charactersActions.getCharacters(1, { status: selectedStatus, name: value }));
  }, [selectedStatus]);
  const handleSearchCharacters = useActionDelay(search);
  const handlePageChange = (e: any, page: number) => {
    setCurrentPage(page);
    dispatch(charactersActions.getCharacters(page));
  };

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearchQuery(e.target.value);
    handleSearchCharacters(e.target.value);
  };
  const handleSelect = (id: string) => {
    setIsDrawerVisible(true);
    dispatch(charactersActions.getCharacterById(id));
  };
  const handleClose = () => {
    setIsDrawerVisible(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleChangeSelectOnly = (e: any, value: string) => {
    setSelectedStatus(value);
    dispatch(charactersActions.getCharacters(1, { status: value, name: searchQuery }));
  };
  useEffect(() => {
    dispatch(charactersActions.getCharacters(1));
  }, [dispatch]);

  return (
    <div className={styles.characters}>
      <Filters
        searchQuery={searchQuery}
        selectedStatus={selectedStatus}
        handleChangeSelectOnly={handleChangeSelectOnly}
        handleChangeSearch={handleChangeSearch}
      />
      <div className={styles.container}>
        {isPending && <Loader/>}
        {characters?.length > 0 ? characters.map((item) => (
          <CharacterItem item={item} key={item.id} handleSelect={handleSelect}/>
        )) : <span data-testid='no-characters'>No items </span>}
      </div>
      {totalPages > 0 && (
        <Pagination
          count={totalPages}
          variant="outlined"
          shape="rounded"
          id='pagination'
          page={currentPage}
          onChange={handlePageChange}
        />
      )}

      <CharacterInfo visible={isDrawerVisible} handleClose={handleClose}/>
    </div>
  );
};
