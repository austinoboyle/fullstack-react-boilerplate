const Todos = require("../models/Todo.model");

exports.getAllTodos = (req, res) => {
    Todos.find({})
        .exec()
        .then(todos => res.json(todos))
        .catch(e => res.send(e));
};

exports.getTodo = (req, res) => {
    const id = req.params.id;
    Todos.findById(id)
        .exec()
        .then(todo => res.json(todo))
        .catch(e => res.send(e));
};

exports.addTodo = (req, res) => {
    const todo = req.body;
    console.log("TODO", todo);
    Todos.create(todo)
        .then(todo => res.json(todo))
        .catch(e => res.send(e));
};

exports.deleteTodo = (req, res) => {
    const id = req.params.id;
    Todos.findByIdAndRemove(id)
        .exec()
        .then(removed => res.json({ success: true, removed }))
        .catch(e => res.send(e));
};

exports.updateTodo = (req, res) => {
    const id = req.params.id;
    Todos.findByIdAndUpdate(id, req.body)
        .exec()
        .then(newTodo => res.json(newTodo))
        .catch(e => res.send(e));
};

exports.clearCompleted = (req, res) => {
    Todos.deleteMany({ completed: true })
        .exec()
        .then(deleted => res.json({ success: true, deleted }))
        .catch(e => res.send(e));
};

exports.toggleAll = (req, res) => {
    const toggleTo = req.body.toggleTo;
    if (toggleTo === undefined || toggleTo === null) {
        return res.status(500).send();
    }
    Todos.updateMany({ completed: !toggleTo }, { completed: toggleTo })
        .exec()
        .then(newTodos => res.json(newTodos))
        .catch(e => res.send(e));
};
