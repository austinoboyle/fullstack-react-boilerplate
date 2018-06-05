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
    Todos.create(todo)
        .exec()
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

exports.toggleCompleted = (req, res) => {
    const id = req.params.id;
    Todos.findByIdAndUpdate(id)
        .exec()
        .then(todo => {
            if (todo) {
                todo.completed = !todo.completed;
                return todo.save();
            }
        })
        .then(newTodo => res.json(newTodo))
        .catch(e => res.send(e));
};
