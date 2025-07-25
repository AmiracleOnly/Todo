import { type Todo } from '../types/data';

function useSortedTodos(todos: Todo[], sort: 'newest' | 'oldest'): Todo[] {
    // Просто возвращаем отсортированный массив напрямую
    // Каждый раз, когда этот хук вызывается (т.е. при ререндере компонента, который его использует),
    // массив будет сортироваться заново, ЕСЛИ todos или sort изменились.
    // Если todos и sort не изменились, но компонент ререндерится, это все равно быстрая операция.
    return [...todos].sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return sort === 'newest' ? dateB - dateA : dateA - dateB;
    });
}

export default useSortedTodos;
