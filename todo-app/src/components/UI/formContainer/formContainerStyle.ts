import {type SxProps, type Theme } from "@mui/material";

interface formContainerStyles {
    formBox: SxProps<Theme>
}

const FormContainerStyles: formContainerStyles = {
    formBox: {
        maxWidth: 400,
        mx: 'auto',
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        border: '1px solid #ccc',
        borderRadius: 2,
        backgroundColor: '#f9f9f9',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    }
}

export default FormContainerStyles
