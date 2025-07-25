import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoSlice';
import authReducer from './authSlice'

export const store = configureStore({
  reducer: {
    todos: todoReducer,
    auth: authReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Что это такое?
// RootState:

// RootState — это тип, который описывает полное состояние (state) твоего Redux Store.
// store.getState — это метод Redux Store, который возвращает текущее состояние всего стора. Он возвращает объект, содержащий все редьюсеры (в твоем случае, например, { todos: TodoState }).
// ReturnType<typeof store.getState> — это утилита TypeScript, которая извлекает тип возвращаемого значения функции store.getState. То есть RootState становится типом, представляющим структуру всего состояния стора.


// AppDispatch:

// AppDispatch — это тип, который описывает функцию dispatch твоего Redux Store.
// store.dispatch — это метод Redux Store, который используется для отправки действий (actions) в стор (например, dispatch(addTodo('Новая задача'))).
// typeof store.dispatch — это TypeScript-способ получить тип функции dispatch, включая все возможные действия, которые она может принимать (включая синхронные и асинхронные действия, если ты используешь createAsyncThunk).
// Пример:
// Если у тебя есть действия addTodo, removeTodo, и асинхронные fetchTodosAsync, то AppDispatch будет типом, который знает, что dispatch может принимать эти действия.


// Зачем они нужны?
// Эти типы необходимы для типизации в TypeScript, чтобы обеспечить безопасность и удобство работы с Redux в твоем приложении. Давай разберем их назначение:

// Для типизации хуков Redux:

// Ты используешь хуки useSelector и useDispatch из react-redux для доступа к состоянию и отправки действий. Без правильной типизации TypeScript не знает, какие данные находятся в сторе и какие действия можно отправлять.
// RootState используется с useSelector, чтобы TypeScript понимал структуру состояния, когда ты выбираешь данные из стора.
// AppDispatch используется с useDispatch, чтобы TypeScript знал, какие действия можно отправлять через dispatch.

// Для поддержки асинхронных действий:

// Когда ты используешь createAsyncThunk (как в дальнейшем для работы с API), dispatch должен знать, что он может принимать асинхронные действия (thunks). AppDispatch включает типы этих действий, что делает их безопасными для использования в TypeScript.
// Для масштабируемости:

// Если ты добавишь новые редьюсеры (например, userReducer, themeReducer), RootState автоматически обновится, чтобы включить их состояния ({ todos: TodoState, user: UserState, theme: ThemeState }). Тебе не придется вручную обновлять типы.
// Аналогично, AppDispatch будет учитывать новые действия из новых слайсов.
