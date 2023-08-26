import { Autocomplete, TextField } from '@mui/material';
import { useAtom } from 'jotai';
import { SyntheticEvent } from 'react';
import { IUser } from '../../../interfaces/interfaces';
import { usersAtom } from '../../../store/store';
import './UserAutocomplete.styles.scss';

interface UserAutocompleteProps {
  onChange: Function;
  className?: string;
}
// TODO: MERGE INTO InputAutocomplete
const UserAutocomplete = ({ onChange, className }: UserAutocompleteProps) => {
  const [users, _setUsers] = useAtom<Array<Partial<IUser>>>(usersAtom);

  const handleAutocompleteChange = (_e: SyntheticEvent, user: Partial<IUser> | null) => {
    onChange(user);
  };

  return (
    <Autocomplete
      disablePortal
      options={users}
      renderInput={(params) => <TextField {...{ ...params, size: 'small' }} label='Izaberite korisnika' />}
      getOptionLabel={(option) => (option.username ? option.username : '')}
      onChange={handleAutocompleteChange}
      className={className ? className : ''}
      renderOption={(props, option: Partial<IUser>) => <li {...{ ...props, className: 'user-autocomplete__option' }}>{option.username}</li>}
      size='small'
    />
  );
};

export default UserAutocomplete;
