import {
    ADD_TODO,
    TOGGLE_ALL,
    TOGGLE,
    DELETE_TODO,
    CLEAR_COMPLETED,
    UPDATE_TODO,
    UPDATE_FILTER
} from "../actions/todoActions";

import { ALL_TODOS } from "../utils";

export const initialState = {
    todos: [],
    nowShowing: ALL_TODOS
};

export function todoReducer(state = initialState, action) {
    let updatedTodos = [...state.todos];
    let updatedShowing = state.nowShowing;
    switch (action.type) {
        case ADD_TODO:
            updatedTodos = state.todos.concat([action.payload]);
            break;
        case DELETE_TODO:
            updatedTodos = state.todos.filter(t => t.id !== action.payload.id);
            break;
        case TOGGLE:
            updatedTodos = state.todos.map(
                t =>
                    t.id === action.payload.id
                        ? { ...t, completed: !t.completed }
                        : t
            );
            break;
        case TOGGLE_ALL:
            updatedTodos = state.todos.map(t => ({ ...t, completed: true }));
            break;
        case CLEAR_COMPLETED:
            updatedTodos = state.todos.filter(t => !t.completed);
            break;
        case UPDATE_TODO:
            updatedTodos = state.todos.map(
                t => (t.id === action.payload.id ? action.payload : t)
            );
            break;
        case UPDATE_FILTER:
            updatedShowing = action.payload;
            break;
        default:
            break;
    }
    return { todos: updatedTodos, nowShowing: updatedShowing };
}
