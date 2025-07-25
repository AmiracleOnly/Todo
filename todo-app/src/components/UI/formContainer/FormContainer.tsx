import {Box, Typography} from '@mui/material'
import FormContainerStyles from './formContainerStyle.ts'

interface FormContainerProps {
    title?:  string;
    children: React.ReactNode
}

const FormContainer = ({title, children} : FormContainerProps) => {
    return(
        <Box component="section" sx={FormContainerStyles.formBox}>
            {title && (
                <Typography variant='h5' align='center' gutterBottom>
                    {title}
                </Typography>
            )}
            {children}
        </Box>
    )
}

export default FormContainer
