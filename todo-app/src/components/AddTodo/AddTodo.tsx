import { useState } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { createTodoAsync } from '../../store/todoAsync';
import { AddTodoWrapper } from './addTodoStyle';
import TextInput from '../UI/input/TextInput/TextInput';
import { Button } from '@mui/material';
import btnnsStyles from '../../style/ButtonStyle';

const AddTodo = () => {
  const [text, setText] = useState('');
  const dispatch = useAppDispatch();

  const handleAdd = async () => {
    if (text.trim()) {
      try {
        await dispatch(createTodoAsync(text));
      // await dispatch(createTodoAsync(text)).unwrap();
        setText('');
      } catch (error) {
        console.error('Ошибка при добавлении задачи:', error);
      }
    }
  };


  return (
    <AddTodoWrapper>
      <TextInput
        value={text}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
        placeholder="Введите задачу"
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && handleAdd()}
        autoFocus
      />
      <Button onClick={handleAdd} variant="contained" sx={btnnsStyles.addBtn}>
        Добавить
      </Button>
    </AddTodoWrapper>
  );
};

export default AddTodo;
