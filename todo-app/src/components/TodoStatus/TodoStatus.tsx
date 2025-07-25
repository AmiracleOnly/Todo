interface TodoStatusProps {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const TodoStatus = ({ status, error }: TodoStatusProps) => {
  if (status === 'loading') {
    return <div>Загрузка...</div>;
  }
  if (status === 'failed') {
    return <div>Ошибка: {error}</div>;
  }
  return null;
};

export default TodoStatus;
