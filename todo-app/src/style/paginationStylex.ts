import {type  SxProps } from '@mui/material';

interface PaginationStyles {
  root: SxProps;
}

const paginationStyles: PaginationStyles = {
  root: {
    marginTop: '16px',
    display: 'flex',
    justifyContent: 'center',
    '& .MuiPaginationItem-root': {
      color: '#007bff',
      '&.Mui-selected': {
        backgroundColor: '#005bff',
        color: '#fff',
      },
      '&:hover': {
        backgroundColor: '#005bff',
        opacity: '0.7',
        color: '#fff'
      },
    },
  },
};

export default paginationStyles;
