import {type SxProps } from "@mui/material"

interface InputStyles{
    textInput: SxProps;
}

const inputStyles: InputStyles ={
    textInput: {
        padding: '8px',
        width: '100%',
        fontSize: '16px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        backgroundColor: '#fff',
        color: '#000',
        '&:focus': {
          outline: 'none',
          borderColor: '#007bff',
          boxShadow: '0 0 4px rgba(0, 123, 255, 0.3)',
        },
    },
}

export default inputStyles
