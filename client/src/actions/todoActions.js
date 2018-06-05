import uuid from "uuid/v4";

export const ADD_TODO = "ADD_TODO";
export const DELETE_TODO = "DELETE_TODO";
export const TOGGLE = "TOGGLE";
export const TOGGLE_ALL = "TOGGLE_ALL";
export const CLEAR_COMPLETED = "CLEAR_COMPLETED";
export const UPDATE_TODO = "UPDATE_TODO";
export const UPDATE_FILTER = "UPDATE_FILTER";

export function addTodo(todo) {
    return function(dispatch) {
        dispatch({ type: ADD_TODO, payload: { ...todo, id: uuid() } });
    };
}

export function toggleAll() {
    return function(dispatch) {
        dispatch({ type: TOGGLE_ALL });
    };
}

export function toggle(todo) {
    return function(dispatch) {
        dispatch({ type: TOGGLE, payload: todo });
    };
}

export function destroy(todo) {
    return function(dispatch) {
        dispatch({ type: DELETE_TODO, payload: todo });
    };
}

export function clearCompleted() {
    return function(dispatch) {
        dispatch({ type: CLEAR_COMPLETED });
    };
}

export function save(todo) {
    return function(dispatch) {
        dispatch({ type: UPDATE_TODO, payload: todo });
    };
}

export function updateFilter(showing) {
    return { type: UPDATE_FILTER, payload: showing };
}
