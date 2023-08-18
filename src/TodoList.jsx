import List from "@mui/material/List";
import { useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";
import { Box, Typography } from "@mui/material";

const initialData = () => {
  let data = JSON.parse(localStorage.getItem("todos"));
  if (!data) return [];
  else return data;
};

export default function TodoList() {
  const [todos, setTodos] = useState(initialData);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const removeTodo = (id) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((t) => t.id !== id);
    });
  };

  const toggleTodo = (id) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        } else {
          return todo;
        }
      });
    });
  };

  const addTodo = (text) => {
    if (!text.trim()) {
        alert("Please add your todo!!!")
        return;
      }
    setTodos((prevTodos) => {
      return [
        ...prevTodos,
        { text: text, id: crypto.randomUUID(), completed: false },
      ];
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems:"center",
        flexDirection:"column",
        margin:"18px"
      }}
    >
      <Typography variant="h2" component="h2" sx={{flexGrow:1,textAlign: 'center',
        fontSize: '2rem', 
        '@media (max-width: 768px)': {
          fontSize: '1.5rem', 
        },
        '@media (max-width: 480px)': {
          fontSize: '1.2rem',
        }}}>
        TODOS LIST
      </Typography>
      <List sx={{ width: '100%', // Full width on larger screens
        maxWidth: 360, // Maximum width for larger screens
        bgcolor: 'background.paper',
        margin: '0 auto', // Center the list horizontally
        padding: '1rem', // Add some padding to the list for better readability
        '@media (max-width: 768px)': {
         
          maxWidth: '100%', // Take full width on smaller screens
          borderRadius: '0', // Remove border-radius on smaller screens if needed
        },
        '@media (max-width: 480px)': {
          
          padding: '0.5rem'
        } }}>
        {todos.map((todo) => (
          <TodoItem
            todo={todo}
            key={todo.id}
            remove={removeTodo}
            toggle={() => toggleTodo(todo.id)}
          />
        ))}
        <TodoForm addTodo={addTodo} />
      </List>
    </Box>
  );
}
