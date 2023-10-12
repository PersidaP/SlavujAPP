import { Autocomplete, createFilterOptions, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import './InputAutocomplete.styles.scss';

export interface IData {
  id: string;
  name: string;
  vat?: string;
  fullName?: string;
}

interface InputAutocompleteProps {
  onChange: Function;
  className?: string;
  values: Array<IData>;
  selectedValue?: IData;
  label: string;
  type: 'buyer' | 'location' | 'product' | 'externalUser' | 'user';
  clear: boolean;
}

const InputAutocomplete = ({ onChange, className, values, label, type, selectedValue, clear }: InputAutocompleteProps) => {
  const [value, setValue] = useState(selectedValue?.id ? selectedValue : null);
  useEffect(() => {
    if (clear) {
      setValue(null);
    }
  }, [clear]);

  useEffect(() => {
    setValue(selectedValue?.id ? selectedValue : null);
  }, [selectedValue]);
  const filterOptions = createFilterOptions({
    stringify: (option: IData) => {
      let stringifyOptions = option.id + option.name;
      if (option.vat) {
        stringifyOptions += option.vat;
      }
      if (option.fullName) {
        stringifyOptions += option.fullName;
      }
      return stringifyOptions;
    },
  });
  return (
    <Autocomplete
      disablePortal
      options={values}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      sx={{
        '& .MuiAutocomplete-input': {
          fontSize: '12px',
        },
      }}
      size='small'
      fullWidth={true}
      value={value}
      className={className ? className : ''}
      renderInput={(params) => <TextField {...{ ...params, size: 'small' }} label={label} />}
      getOptionLabel={(option) => (option.id ? `${option.id} / ${option.name}` : '')}
      filterOptions={filterOptions}
      renderOption={(props, option: IData) => {
        return (
          <li {...{ ...props, className: 'input-autocomplete' }}>
            <div className='input-autocomplete__container'>
              <hr />
              <div className='input-autocomplete__container__info'>
                {option.id} / {option.name}
              </div>
              {option.vat ? <div className='input-autocomplete__container__vat'>pib: {option.vat}</div> : null}
              {option.fullName ? <div className='input-autocomplete__container__fullName'>Puno ime: {option.fullName}</div> : null}
            </div>
          </li>
        );
      }}
      onChange={(e, val, reason) => {
        setValue(val);
        onChange(val, type, reason);
      }}
    />
  );
};
export default InputAutocomplete;
