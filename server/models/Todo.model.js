const mongoose = require("mongoose");

const schema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    completed: {
        type: Boolean,
        default: false,
        required: true
    }
});

// Name, schema, collection name
const Todo = mongoose.model("Todo", schema, "todos");

module.exports = Todo;
