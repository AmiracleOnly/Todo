import { type Todo } from '../../types/data';
import { useAppDispatch } from '../../store/hooks';
import { useState } from 'react';
import { toggleTodoAsync, deleteTodoAsync, editTodoAsync, fetchTodosAsync } from '../../store/todoAsync';
import { TodoItemWrapper, TodoText } from './todoItemStyle';
import CheckboxInput from '../UI/input/CheckBoxInput/CheckboxInput';
import TextInput from '../UI/input/TextInput/TextInput';
import { Button, IconButton } from '@mui/material';
import btnnsStyles from '../../style/ButtonStyle';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { useAppSelector } from '../../store/hooks';

interface TodoItemProps {
  todo: Todo;
}

const TodoItem = ({ todo }: TodoItemProps) => {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const { page, limit } = useAppSelector((state) => state.todos); // Получаем page и limit из Redux

  const handleToggle = () => {
    dispatch(toggleTodoAsync(todo.id));
  };

  const handleDelete = async () => {
    console.log('Deleting todo with id:', todo.id);
    try {
      await dispatch(deleteTodoAsync(todo.id)).unwrap();
      await dispatch(fetchTodosAsync({ page, limit }));
      console.log('Список задач обновлен после удаления');
    } catch (error) {
      console.error('Ошибка при удалении задачи:', error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editText.trim()) {
      dispatch(editTodoAsync({ id: todo.id, text: editText.trim(), completed: todo.completed }));
    } else {
      setEditText(todo.text);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <TodoItemWrapper>
      <CheckboxInput
        checked={todo.completed}
        onChange={handleToggle}
      />
      {isEditing ? (
        <TextInput
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <TodoText completed={todo.completed}>
          {todo.text}
        </TodoText>
      )}
      {isEditing ? (
        <>
          <IconButton
            onClick={handleSave}
            sx={btnnsStyles.saveBtn}
          >
            <SaveIcon fontSize="small" />
          </IconButton>
          <IconButton
            onClick={handleCancel}
            sx={btnnsStyles.canselBtn}
          >
            <CancelIcon fontSize="small" />
          </IconButton>
        </>
      ) : (
        <IconButton
          onClick={handleEdit}
          sx={btnnsStyles.editBtn}
        >
          <EditIcon fontSize="small" />
        </IconButton>
      )}
      <Button
        onClick={handleDelete}
        variant="contained"
        sx={btnnsStyles.deleteBtn}
      >
        Удалить
      </Button>
    </TodoItemWrapper>
  );
};

export default TodoItem;
