import { type SxProps, } from "@mui/material";

interface ButtonsStyles {
    editBtn: SxProps;
    saveBtn: SxProps;
    canselBtn: SxProps;
    deleteBtn: SxProps;
    addBtn: SxProps;
}

const btnnsStyles: ButtonsStyles = {
    editBtn: {
        bgсolor: '#FFED00',
        '&:hover': { bgcolor: '#FFED00' },
        margin: '0 4px',
    },
    saveBtn: {
        bgcolor: '#007bff',
        '&:hover': { bgcolor: '#0056b3' },
        margin: '0 4px',
      },
      canselBtn: {
        bgcolor: '#6c757d',
        '&:hover': { bgcolor: '#5a6268' },
        margin: '0 4px',
      },
      deleteBtn: {
        bgcolor: '#dc3545',
        '&:hover': { bgcolor: '#c82333' },
        padding: '5px 10px',
        margin: '0 4px',
        textTransform: 'none',
      },
      addBtn: {
        color: 'white',
        bgcolor: '#007bff',
        '&:hover': { bgcolor: '#005bff' },
        padding: '5px 10px',
        margin: '0 4px',
        textTransform: 'none',
        width: '100%'
      }
}

export default btnnsStyles
