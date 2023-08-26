import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { SelectInputProps } from '@mui/material/Select/SelectInput';
import React, { RefObject } from 'react';

interface RoleSelectProps {
  ref: RefObject<SelectInputProps>;
  className?: string;
}

const RoleSelect = React.forwardRef(({ className }: RoleSelectProps, ref) => {
  return (
    <FormControl className={className ? className : ''}>
      <InputLabel size='small' id='role-select-label'>
        Uloga
      </InputLabel>
      <Select labelId='role-select-label' label='Uloga' id='role-select' inputRef={ref} size='small' defaultValue={3}>
        <MenuItem value={3}>Korisnik</MenuItem>
        <MenuItem value={2}>Administrator</MenuItem>
      </Select>
    </FormControl>
  );
});

export default RoleSelect;
