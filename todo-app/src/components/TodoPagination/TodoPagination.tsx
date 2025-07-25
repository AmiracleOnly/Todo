import {PaginationWrapper} from './todoPaginationStyle'
import {Pagination} from '@mui/material'
import paginationStyles from '../../style/paginationStylex';

interface TodoPaginationProps {
    page: number;
    totalPages: number;
    handlePageChange: (event: React.ChangeEvent<unknown>, newPage: number) => void;
}


const TodoPagination = ({page, totalPages, handlePageChange}: TodoPaginationProps) => {
    return(
        <PaginationWrapper>
            <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            sx={paginationStyles.root}
            />
      </PaginationWrapper>
    )
}

export default TodoPagination;

