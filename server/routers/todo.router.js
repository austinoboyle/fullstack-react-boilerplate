const router = require("express").Router();
const todoController = require("../controllers/todo.controller");
module.exports = router;

router
    .route("/")
    .get(todoController.getAllTodos)
    .post(todoController.addTodo);

router.post("/toggleAll", todoController.toggleAll);
router.post("/clearCompleted", todoController.clearCompleted);

router
    .route("/:id")
    .get(todoController.getTodo)
    .put(todoController.updateTodo)
    .delete(todoController.deleteTodo);
