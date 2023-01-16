import React from 'react';
import { Avatar, Drawer, List, ListItem, Typography } from '@mui/material';
import { useAppSelector } from 'store';
import { charactersSelectors } from 'store/characters/config';

import styles from './CharacterInfo.module.scss';

export type CharacterInfo = {
    visible: boolean;
    handleClose: () => void
}
export const CharacterInfo: React.FC<CharacterInfo> = ({ visible, handleClose }) => {
  const character = useAppSelector(charactersSelectors.selectSpecificCharacter);

  return (
    <Drawer
      anchor='right'
      open={visible}
      onClose={handleClose}
    >
      {
        character && (
          <div className={styles.drawerContainer} id='character-info' data-testid='character-info'>
            <div className='d-flex items-center'>
              <Avatar src={character.image} className='mr-1'/>
              <Typography>
                {character.name}
              </Typography>
            </div>
            <Typography>
                    Location -  {character.location.name}
            </Typography>
            <Typography>
                    Status -  {character.status}
            </Typography>
            <Typography>
                  Gender - {character.gender}
            </Typography>
            <Typography>Episodes</Typography>
            <List className={styles.episodesList}>
              {character.episode?.map((item) => {
                return <ListItem key={item.id}>
                  <Typography>
                    {item.name},
                  </Typography>
                  <Typography>
                        Air date - {item.air_date}
                  </Typography>
                </ListItem>;
              })
              }
            </List>
          </div>
        )
      }
    </Drawer>
  );
};
