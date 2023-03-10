import React from 'react';
import { Card, CardActionArea, CardContent, CardHeader, CardMedia, Typography } from '@mui/material';
import { Character, Status } from 'store/characters/characters.slice';
import { GiDeathSkull } from 'react-icons/gi';
import styles from './CharacterItem.module.scss';

type CharacterItemProps = {
    item: Character;
    handleSelect: (id: string) => void;
}
export const CharacterItem: React.FC<CharacterItemProps> = ({ item, handleSelect }) => {
  const handleClick = () => {
    handleSelect?.(item.id);
  };
  return (
    <div data-testid='characterItem' onClick={handleClick}>
      <Card
        key={item.id}
        className={styles.card}>
        <CardHeader
          avatar={
            item.status === Status.DEAD && <GiDeathSkull/>
          }
          title={`Gender - ${item.gender}`}
          subheader={`Location ${item.location.name}`}
        />
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={item.image}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {item.name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
};
