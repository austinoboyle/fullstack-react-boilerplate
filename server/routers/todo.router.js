const router = require("express").Router();
const todoController = require("../controllers/todo.controller");
module.exports = router;

router
    .route("/")
    .get(todoController.getAllTodos)
    .post(todoController.addTodo);

router
    .route("/:id")
    .get(todoController.getTodo)
    .put(todoController.toggleCompleted)
    .delete(todoController.deleteTodo);
