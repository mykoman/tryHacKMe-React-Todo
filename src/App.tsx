// In src/App.tsx

import React, { useState, useEffect } from "react";
import "./App.css";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

interface Todo {
  _id: string;
  text: string;
  completed: boolean;
}

const BASE_URL = "http://localhost:5000/api/v1/";
const todoUrl = `${BASE_URL}todos/`;

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(todoUrl);
      const { data } = await response.json();
      setTodos(data);
    };
    fetchData();
  }, []);

  const addTodo = async () => {
    const response = await fetch(todoUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: newTodo }),
    });
    const { data } = await response.json();
    setTodos([data, ...todos]);
    setNewTodo("");
  };

  const toggleTodo = async (id: string, completed: boolean) => {
    const response = await fetch(`${todoUrl}${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: !completed }),
    });
    const { data } = await response.json();
    const updatedTodos = todos.map((todo) =>
      todo._id === data._id ? data : todo
    );
    setTodos(updatedTodos);
  };

  const deleteTodo = async (id: string) => {
    await fetch(`${todoUrl}${id}`, {
      method: "DELETE",
    });
    const updatedTodos = todos.filter((todo) => todo._id !== id);
    setTodos(updatedTodos);
  };

  return (
    <div className="App">
      <h1>Todo App</h1>
      <div>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={addTodo}>Add Todo</button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            <span
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
              onClick={() => toggleTodo(todo._id, todo.completed)}
            >
              {todo.text}
            </span>
            <Button
              onClick={() => deleteTodo(todo._id)}
              variant="contained"
              endIcon={<DeleteIcon />}
            >
              Delete
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
