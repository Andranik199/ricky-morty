import React, { ChangeEvent } from 'react';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material';
import { Status } from 'store/characters/characters.slice';


type FiltersProps = {
    selectedStatus: string,
    searchQuery: string;
    handleChangeSearch: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleChangeSelectOnly: (e: any, value: string) => void;
}
export const Filters: React.FC<FiltersProps> = (
    {
      selectedStatus,
      handleChangeSelectOnly,
      searchQuery,
      handleChangeSearch,
    }) => {
  return (
    <div>
      <FormControl>
        <FormLabel id="demo-controlled-radio-buttons-group">Select only</FormLabel>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={selectedStatus}
          onChange={handleChangeSelectOnly}
        >
          <FormControlLabel value={Status.ALIVE} control={<Radio/>} label="Alive"/>
          <FormControlLabel value={Status.DEAD} control={<Radio/>} label="Dead"/>
          <FormControlLabel value={''} control={<Radio/>} label="All"/>
        </RadioGroup>
      </FormControl>

      <TextField
        label="Please type your character name"
        type="search"
        value={searchQuery}
        onChange={handleChangeSearch}
      />
    </div>
  );
};
