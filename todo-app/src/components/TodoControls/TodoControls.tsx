import {ControlsWrapper,} from './todoControlsStyle'
import {FormControl, Select, MenuItem, type SelectChangeEvent} from '@mui/material'
import selectStyles from '../../style/selectStyles';

interface TodoControlsProps {
    limit: number;
    sort: 'newest' | 'oldest'
    handleLimitChange: (event: SelectChangeEvent<string | number>) => void;
    handleSortChange: (event: SelectChangeEvent<'newest' | 'oldest'>) => void;

}

const TodoControls = ({limit, sort, handleLimitChange, handleSortChange}: TodoControlsProps) => {
    return(
        <ControlsWrapper>
        <FormControl variant="outlined" size="small" sx={selectStyles.formControl}>
          <Select
            value={limit}
            onChange={handleLimitChange}
            label="Задач на странице"
            sx={selectStyles.select}
          >
            <MenuItem sx={selectStyles.menuItem}  value={5}>5</MenuItem>
            <MenuItem sx={selectStyles.menuItem} value={10}>10</MenuItem>
            <MenuItem sx={selectStyles.menuItem} value={20}>20</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="outlined" size="small" sx={selectStyles.formControl}>
          <Select
            value={sort}
            onChange={handleSortChange}
            label="Сортировка"
            sx={selectStyles.select}
          >
            <MenuItem sx={selectStyles.menuItem} value="newest">Новые</MenuItem>
            <MenuItem sx={selectStyles.menuItem} value="oldest">Старые</MenuItem>
          </Select>
        </FormControl>
      </ControlsWrapper>
    )
}

export default TodoControls
