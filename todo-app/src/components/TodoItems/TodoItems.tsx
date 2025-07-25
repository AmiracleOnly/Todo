import TodoItem from '../TodoItem/TodoItem';
import {type Todo} from '../../types/data'

interface TodoItemsProps {
    todos: Todo[]
}

const TodoItems = ({ todos }: TodoItemsProps) => {
  console.log('TodoItems: todos=', todos.map(t => t.text));
  return (
    <>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </>
  );
};

export default TodoItems;
