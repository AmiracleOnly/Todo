import { List } from './todoListStyle';
import AddTodo from '../AddTodo/AddTodo';
import useTodos from '../../hooks/useTodos';
import useTodoSettings from '../../hooks/useTodoSetting';
import useSortedTodos from '../../hooks/useSortedTodos';
import ThemeToggle from '../themeToggle/ThemeToogle'
import TodoControls from '../TodoControls/TodoControls';
import TodoItems from '../TodoItems/TodoItems';
import TodoPagination from '../TodoPagination/TodoPagination';

const TodoList = () => {
  const { page, limit, sort, handlePageChange, handleLimitChange, handleSortChange } =
    useTodoSettings();
  const { todos,totalPages } = useTodos(page, limit);
  const sortedTodos = useSortedTodos(todos, sort);

  return (
    <List>
      <AddTodo />
      <ThemeToggle />
      <TodoControls
        limit={limit}
        sort={sort}
        handleLimitChange={handleLimitChange}
        handleSortChange={handleSortChange}
      />
      <TodoItems todos={sortedTodos} />
      <TodoPagination
        page={page}
        totalPages={totalPages}
        handlePageChange={handlePageChange} />
    </List>
  );
};

export default TodoList;
