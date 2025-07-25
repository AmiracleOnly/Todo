import { Link } from "react-router-dom"
import { Button } from "@mui/material"
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
const NotFoundPage = () => {
    return (
        <div>
            <h2>Oopsy page is not founded </h2>
            <Button component={Link} to='/' color="inherit">
            <KeyboardBackspaceIcon />
            BACK TO HOME PAGE</Button>
        </div>
    )
}

export default NotFoundPage
