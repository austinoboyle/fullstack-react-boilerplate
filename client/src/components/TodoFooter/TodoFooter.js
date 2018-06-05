import React from "react";
import { pluralize } from "../../utils";
import ccn from "classnames";
import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS } from "../../utils";
import { updateFilter } from "../../actions/todoActions";
import { connect } from "react-redux";

const TodoFooter = ({
    nowShowing,
    count,
    onClearCompleted,
    completedCount,
    updateFilter
}) => {
    var activeTodoWord = pluralize(count, "item");
    var clearButton = null;

    if (completedCount > 0) {
        clearButton = (
            <button className="clear-completed" onClick={onClearCompleted}>
                Clear completed
            </button>
        );
    }
    const filters = [ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS];
    return (
        <footer className="footer">
            <span className="todo-count">
                <strong>{count}</strong> {activeTodoWord} left
            </span>
            <ul className="filters">
                {filters.map(type => (
                    <li>
                        <button
                            className={ccn({ selected: nowShowing === type })}
                            onClick={() => updateFilter(type)}
                        >
                            {type}
                        </button>
                    </li>
                ))}
            </ul>
            {clearButton}
        </footer>
    );
};

const actions = { updateFilter };

export default connect(null, actions)(TodoFooter);
