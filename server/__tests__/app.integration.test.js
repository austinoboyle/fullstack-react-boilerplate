const api = require("../api");
const supertest = require("supertest")(api);
const mongoose = require("mongoose");
const Todos = require("../models/Todo.model");

// Some mongoose objects used to pre-populate the test database
const DEFAULT_TODOS = [
    { name: "Test" },
    { name: "Test 2", completed: true },
    { name: "Test 3", completed: true }
];
const CONNECTION_URI = "mongodb://localhost/test";

// Passing a test a `done` function will ensure that other actions to not
// proceed before the function is called.  This is very useful for testing
// async processes
describe("Integration test for todo routes", () => {
    let defaultTodos;

    // Start up test mongoose db before running all tests
    beforeAll(done => {
        mongoose
            .connect(CONNECTION_URI)
            .then(() => mongoose.connection.db.dropDatabase(e => done(e)))
            .catch(e => done(e));
    });

    // Close mongoose connection after test suite finished
    afterAll(done => mongoose.connection.close(e => done(e)));
    // Clear database after each unit test
    afterEach(done => mongoose.connection.db.dropDatabase(e => done(e)));
    // Populate db with defaults before each unit test
    beforeEach(done => {
        Todos.create(DEFAULT_TODOS).then(todos => {
            // Serialize mongoose objects into regular js objects
            defaultTodos = todos.map(JSON.stringify).map(JSON.parse);
            done();
        });
    });
    it("Should reject invalid todo", done => {
        const invalidTodo = { invalidProperty: "test" };
        return supertest
            .post("/api/todos")
            .send(invalidTodo)
            .expect(400) //Expect error status
            .then((e, res) => {
                const errors = JSON.parse(e.text);
                expect(errors.name).toBeDefined();
                done();
            });
    });
    it("Adds valid todo to DB", done => {
        const validTodo = {
            name: "Test"
        };
        supertest
            .post("/api/todos")
            .send(validTodo)
            .expect(200)
            .then((res, e) => {
                if (e) {
                    done(e);
                }
                Todos.find({})
                    .exec()
                    .then(todos => {
                        expect(todos.length).toBe(DEFAULT_TODOS.length + 1);
                        done();
                    })
                    .catch(e => done(e));
            });
    });
    it("Gets Todo by ID", done => {
        supertest
            .get(`/api/todos/${defaultTodos[0]._id}`)
            .expect(200)
            .then(res => res.body)
            .then(todo => {
                expect(todo).toEqual(defaultTodos[0]);
                done();
            })
            .catch(e => done(e));
    });
    it("Deletes todo by ID", done => {
        const id = defaultTodos[0]._id;
        supertest
            .delete(`/api/todos/${id}`)
            .expect(200)
            .then(res => {
                Todos.find().then(todos => {
                    expect(todos.length).toBe(defaultTodos.length - 1);
                    expect(todos.indexOf(t => t._id === id)).toBe(-1);
                    done();
                });
            })
            .catch(e => done(e));
    });
    it("Updates todo by ID", done => {
        const id = defaultTodos[0]._id;
        let updatedTodo = defaultTodos[0];
        updatedTodo.name = "NewName";
        supertest
            .put(`/api/todos/${id}`)
            .send(updatedTodo)
            .then(res => res.body)
            .then(newTodo => {
                expect(newTodo.name).toBe(updatedTodo.name);
                done();
            })
            .catch(e => done(e));
    });
    it("Clears Completed Todos", done => {
        supertest
            .post("/api/todos/clearCompleted")
            .expect(200)
            .then(res => {
                Todos.find().then(todos => {
                    expect(todos.length).toBe(
                        defaultTodos.filter(t => !t.completed).length
                    );
                    done();
                });
            })
            .catch(e => done(e));
    });
    it("Toggles all todos", done => {
        supertest
            .post("/api/todos/toggleAll")
            .send({ toggleTo: false })
            .expect(200)
            .then(res => {
                Todos.find().then(newTodos => {
                    expect(newTodos.length).toBe(defaultTodos.length);
                    expect(newTodos.filter(t => t.completed).length).toBe(0);
                    done();
                });
            })
            .catch(e => done(e));
    });
});
