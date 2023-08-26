import { Box } from '@mui/material';
import React from 'react';
import './main.styles.scss';

interface Props {
  children: React.ReactNode;
}

const Main = ({ children }: Props) => {
  return <Box className='main-height'>{children}</Box>;
};

export default Main;
