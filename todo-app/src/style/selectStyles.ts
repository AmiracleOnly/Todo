import {type SxProps} from '@mui/material'

interface SelectStyles {
    formControl: SxProps;
    select: SxProps;
    menuItem: SxProps;
}

const selectStyles: SelectStyles = {
    formControl: {
      minWidth: 100,
      margin: '16px 0',
    },
    select: {
      bgcolor: '#fff',
      borderRadius: '4px',
      '& .MuiSelect-select': {
        padding: '8px 12px',
      },
    },
    menuItem: {
      padding: '8px 16px',
      '&:hover': {
        backgroundColor: '#e9ecef',
      },
    },
  };

  export default selectStyles;
