const MockModel = require("jest-mongoose-mock");
jest.mock("../models/Todo.model.js", () => new MockModel());
const todoController = require("./todo.controller");
const Todos = require("../models/Todo.model");

describe("Check if Models are called with correct args", () => {
    let req, res;
    beforeEach(() => {
        jest.clearAllMocks();
        req = {};
        res = { json: jest.fn() };
    });
    it("Calls exec and then for getAllTodos", () => {
        todoController.getAllTodos(req, res);
        expect(Todos.exec.mock.calls.length).toBe(1);
        expect(Todos.then.mock.calls.length).toBe(1);
    });
    it("Calls getTodo with correct ID", () => {
        req.params = { id: "test" };
        todoController.getTodo(req, res);
        expect(Todos.findById.mock.calls[0]).toEqual(["test"]);
        expect(Todos.then.mock.calls.length).toBe(1);
    });
});
