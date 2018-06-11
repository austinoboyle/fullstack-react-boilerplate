import {
    ADD_TODO,
    TOGGLE_ALL,
    TOGGLE,
    DELETE_TODO,
    CLEAR_COMPLETED,
    UPDATE_TODO,
    UPDATE_FILTER,
    HYDRATE_TODO,
    FETCH_TODOS
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
        case FETCH_TODOS:
            updatedTodos = action.payload;
            break;
        case ADD_TODO:
            updatedTodos = state.todos.concat([action.payload]);
            break;
        case DELETE_TODO:
            updatedTodos = state.todos.filter(t => t.id !== action.payload.id);
            break;
        case TOGGLE:
            updatedTodos = state.todos.map(
                t =>
                    t._id === action.payload._id
                        ? { ...t, completed: !t.completed }
                        : t
            );
            break;
        case TOGGLE_ALL:
            updatedTodos = state.todos.map(t => ({
                ...t,
                completed: action.toggleTo
            }));
            break;
        case CLEAR_COMPLETED:
            updatedTodos = state.todos.filter(t => !t.completed);
            break;
        case UPDATE_TODO:
            updatedTodos = state.todos.map(
                t => (t._id === action.payload._id ? action.payload : t)
            );
            break;
        case HYDRATE_TODO:
            updatedTodos = state.todos.map(
                t =>
                    t._id === action.payload.old_id
                        ? { ...t, _id: action.payload.new_id }
                        : t
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
