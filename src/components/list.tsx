import { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface Todo {
  _id: string;
  text: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function CheckboxList() {
  //const apiUrl = process.env.BASE_URL;
  const baseUrl = "http://localhost:5000/api/v1/";
  const todoUrl = `${baseUrl}todos/`;

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

  const [checked, setChecked] = useState([0]);

  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {todos.map((todo) => {
        const labelId = `checkbox-list-label-${todo}`;

        return (
          <ListItem key={todo._id} disablePadding>
            <ListItemButton
              role={undefined}
              // onClick={}
              dense
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={(todo.completed)}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={todo.text} />
              <ListItemText id={labelId} primary={todo.createdAt} />
              <Button variant="contained" endIcon={<EditIcon />}></Button>
              <Button variant="contained" endIcon={<DeleteIcon />}></Button>
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
