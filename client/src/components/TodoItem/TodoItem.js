import React, { Component } from "react";
import classNames from "classnames";
const ESCAPE_KEY = 27;
const ENTER_KEY = 13;

export default class TodoItem extends Component {
    constructor() {
        super();
        this.state = {
            editText: ""
        };
    }
    handleSubmit = event => {
        var val = this.state.editText.trim();
        if (val) {
            this.props.onSave(val);
            this.setState({ editText: val });
        } else {
            this.props.onDestroy();
        }
    };

    handleEdit = () => {
        this.props.onEdit();
        this.setState({ editText: this.props.todo.name });
    };

    handleKeyDown = event => {
        switch (event.which) {
            case ESCAPE_KEY:
                this.setState({ editText: this.props.todo.name });
                this.props.onCancel(event);
                break;
            case ENTER_KEY:
                this.handleSubmit(event);
                break;
            default:
                break;
        }
    };

    handleChange = event => {
        console.log("EDITTEXT", event.target.value);
        if (this.props.editing) {
            this.setState({ editText: event.target.value });
        }
    };

    getInitialState = () => {
        return { editText: this.props.todo.name };
    };

    /**
     * This is a completely optional performance enhancement that you can
     * implement on any React component. If you were to delete this method
     * the app would still work correctly (and still be very performant!), we
     * just use it as an example of how little code it takes to get an order
     * of magnitude performance improvement.
     */
    shouldComponentUpdate = (nextProps, nextState) => {
        return (
            nextProps.todo !== this.props.todo ||
            nextProps.editing !== this.props.editing ||
            nextState.editText !== this.state.editText
        );
    };

    /**
     * Safely manipulate the DOM after updating the state when invoking
     * `this.props.onEdit()` in the `handleEdit` method above.
     * For more info refer to notes at https://facebook.github.io/react/docs/component-api.html#setstate
     * and https://facebook.github.io/react/docs/component-specs.html#updating-componentdidupdate
     */
    componentDidUpdate = prevProps => {
        if (!prevProps.editing && this.props.editing) {
            this.editField.focus();
            this.editField.setSelectionRange(
                this.editField.value.length,
                this.editField.value.length
            );
        }
    };
    render() {
        const { todo, editing, onToggle, onDestroy } = this.props;
        return (
            <li
                className={classNames({
                    completed: todo.completed,
                    editing: editing
                })}
            >
                <div className="view">
                    <input
                        className="toggle"
                        type="checkbox"
                        checked={todo.completed}
                        onChange={onToggle}
                    />
                    <label onDoubleClick={this.handleEdit}>{todo.name}</label>
                    <button className="destroy" onClick={onDestroy} />
                </div>
                <input
                    ref={el => {
                        this.editField = el;
                    }}
                    className="edit"
                    value={this.state.editText}
                    onBlur={this.handleSubmit}
                    onChange={this.handleChange}
                    onKeyDown={this.handleKeyDown}
                />
            </li>
        );
    }
}
