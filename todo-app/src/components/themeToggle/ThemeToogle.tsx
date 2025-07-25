import Switch from '@mui/material/Switch';
import {useTheme, lightTheme, darkTheme} from '../../hooks/ThemeUtils'
import {ThemeSwitchWrapper, ThemeLabel} from './themeToggleStyle'
import FormControlLabel from '@mui/material/FormControlLabel';


const ThemeToggle = () => {
    const {theme, toggleTheme} = useTheme()
    return(
        <ThemeSwitchWrapper>
            <FormControlLabel
                control={<Switch checked={theme === darkTheme} onChange={toggleTheme} />}
                label={<ThemeLabel>{theme === lightTheme ?  '☀️':  '🌙'}</ThemeLabel>}
            />
        </ThemeSwitchWrapper>
    )
}

export default ThemeToggle
