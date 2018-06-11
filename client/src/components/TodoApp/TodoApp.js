import React, { Component } from "react";
import TodoItem from "../TodoItem/TodoItem";
import TodoFooter from "../TodoFooter/TodoFooter";
import { connect } from "react-redux";
import {
    addTodo,
    toggleAll,
    toggle,
    destroy,
    save,
    clearCompleted,
    fetchTodos
} from "../../actions/todoActions";
import { ACTIVE_TODOS, COMPLETED_TODOS } from "../../utils";
const ENTER_KEY = 13;

export class TodoApp extends Component {
    constructor() {
        super();
        this.state = {
            editing: null,
            newTodo: ""
        };
    }

    componentDidMount = () => {
        this.props.fetchTodos();
    };

    handleChange = event => {
        this.setState({ newTodo: event.target.value });
    };

    handleNewTodoKeyDown = event => {
        if (event.keyCode !== ENTER_KEY) {
            return;
        }

        event.preventDefault();

        let val = this.state.newTodo.trim();

        if (val) {
            this.props.addTodo({ name: val, completed: false });
            this.setState({ newTodo: "" });
        }
    };

    toggleAll = event => {
        let checked = event.target.checked;
        console.log("CHECKED", checked);
        this.props.toggleAll(checked);
    };

    toggle = todoToToggle => {
        this.props.toggle(todoToToggle);
    };

    destroy = todo => {
        this.props.destroy(todo);
    };

    edit = todo => {
        this.setState({ editing: todo.id });
    };

    save = (todoToSave, newName) => {
        if (todoToSave.name === newName) {
            return;
        }
        this.props.save({ ...todoToSave, name: newName });
        this.setState({ editing: null });
    };

    cancel = () => {
        this.setState({ editing: null });
    };

    clearCompleted = () => {
        this.props.clearCompleted();
    };

    render() {
        const { todos } = this.props;
        let footer;
        let main;
        let shownTodos = todos.filter(todo => {
            switch (this.props.nowShowing) {
                case ACTIVE_TODOS:
                    return !todo.completed;
                case COMPLETED_TODOS:
                    return todo.completed;
                default:
                    return true;
            }
        });

        let todoItems = shownTodos.map(function(todo) {
            return (
                <TodoItem
                    key={todo._id}
                    todo={todo}
                    onToggle={this.toggle.bind(this, todo)}
                    onDestroy={() => this.destroy(todo)}
                    onEdit={() => this.edit(todo)}
                    editing={this.state.editing === todo.id}
                    onSave={newName => this.save(todo, newName)}
                    onCancel={this.cancel}
                />
            );
        }, this);

        let activeTodoCount = todos.reduce(function(accum, todo) {
            return todo.completed ? accum : accum + 1;
        }, 0);

        let completedCount = todos.length - activeTodoCount;

        if (activeTodoCount || completedCount) {
            footer = (
                <TodoFooter
                    count={activeTodoCount}
                    completedCount={completedCount}
                    nowShowing={this.props.nowShowing}
                    onClearCompleted={this.clearCompleted}
                />
            );
        }

        if (todos.length) {
            main = (
                <section className="main">
                    <input
                        id="toggle-all"
                        className="toggle-all"
                        type="checkbox"
                        onChange={this.toggleAll}
                        checked={activeTodoCount === 0}
                    />
                    <label htmlFor="toggle-all" />
                    <ul className="todo-list">{todoItems}</ul>
                </section>
            );
        }
        return (
            <div>
                <header className="header">
                    <h1>todos</h1>
                    <input
                        className="new-todo"
                        placeholder="What needs to be done?"
                        value={this.state.newTodo}
                        onKeyDown={this.handleNewTodoKeyDown}
                        onChange={this.handleChange}
                        autoFocus={true}
                    />
                </header>
                {main}
                {footer}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        todos: state.todos,
        nowShowing: state.nowShowing
    };
}

const actions = {
    addTodo,
    toggleAll,
    toggle,
    destroy,
    save,
    clearCompleted,
    fetchTodos
};

export default connect(
    mapStateToProps,
    actions
)(TodoApp);
