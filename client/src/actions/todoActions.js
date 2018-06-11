import uuid from "uuid/v4";
import axios from "axios";

export const ADD_TODO = "ADD_TODO";
export const DELETE_TODO = "DELETE_TODO";
export const TOGGLE = "TOGGLE";
export const TOGGLE_ALL = "TOGGLE_ALL";
export const CLEAR_COMPLETED = "CLEAR_COMPLETED";
export const UPDATE_TODO = "UPDATE_TODO";
export const UPDATE_FILTER = "UPDATE_FILTER";
export const HYDRATE_TODO = "HYDRATE_TODO";
export const ERROR = "ERROR";
export const FETCH_TODOS = "FETCH_TODOS";

export function fetchTodos() {
    return function(dispatch) {
        axios
            .get("/api/todos")
            .then(res => res.data)
            .then(todos => dispatch({ type: FETCH_TODOS, payload: todos }))
            .catch(e => dispatch({ type: ERROR, error: e }));
    };
}

export function addTodo(todo) {
    return function(dispatch) {
        const _id = uuid();
        dispatch({ type: ADD_TODO, payload: { ...todo, _id } });
        axios
            .post("/api/todos", todo)
            .then(res => res.data)
            .then(todo => {
                dispatch({
                    type: HYDRATE_TODO,
                    payload: { old_id: _id, new_id: todo._id }
                });
            })
            .catch(e => dispatch({ type: ERROR, payload: e }));
    };
}

export function toggleAll(toggleTo) {
    return function(dispatch) {
        dispatch({ type: TOGGLE_ALL, toggleTo });
        axios.post("/api/todos/toggleAll", { toggleTo });
    };
}

export function toggle(todo) {
    return function(dispatch) {
        const newTodo = { ...todo, completed: !todo.completed };
        dispatch({ type: TOGGLE, payload: newTodo });
        axios
            .put(`/api/todos/${todo._id}`, newTodo)
            .then(newTodo => {})
            .catch(e => console.error(e));
    };
}

export function destroy(todo) {
    return function(dispatch) {
        dispatch({ type: DELETE_TODO, payload: todo });
        axios
            .delete(`/api/todos/${todo._id}`)
            .then(response => console.log(response))
            .catch(e => console.error(e));
    };
}

export function clearCompleted() {
    return function(dispatch) {
        dispatch({ type: CLEAR_COMPLETED });
        axios.post("/api/todos/clearcompleted");
    };
}

export function save(todo) {
    return function(dispatch) {
        dispatch({ type: UPDATE_TODO, payload: todo });
        axios.put(`/api/todos/${todo._id}`, todo);
    };
}

export function updateFilter(showing) {
    return { type: UPDATE_FILTER, payload: showing };
}
