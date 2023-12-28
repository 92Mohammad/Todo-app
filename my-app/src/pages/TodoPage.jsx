import React, { useEffect, useState} from "react";
import Header from "../components/Header";
import Todo from "../components/Todo";
import { useSelector} from 'react-redux'
import { useNavigate } from "react-router-dom";



export default function TodoPage() {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  console.log('this is todos arrays: ', todos);

  // const [todos, setTodos] = React.useState([]);
  const [inputText, setInputText] = useState("");
  
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token){
      navigate('/login');
    }
  }, [])

  function handleChange(event) {
    setInputText(event.target.value);
  }

  const getAllTodo = async () => {
    try {
      const response = await fetch("http://localhost:8000/getAllTodo", {
        method: "GET",
        headers: {
          authorization: localStorage.getItem("token"),
        },
      });
      // const data = await response.json();
      // setTodos(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getAllTodo();
  }, []);

  return (
    <>
      <Header isLogin={true} />
      <main className="todoPage">
        <div className="read-todo-section">
          <input
            type="text"
            placeholder="Enter new todo..."
            name="todo"
            value = {inputText}
            onChange={handleChange}
          />
          <button
            onClick={async () => {
              try {
                const response = await fetch("http://localhost:8000/createNewTodo", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    authorization: localStorage.getItem("token"),
                  },
                  body: JSON.stringify({
                    task: inputText,
                  }),
                });
                if (response.status === 201) {
                  getAllTodo();
                  setInputText("");
                }
              } catch (error) {
                console.log(error);
              }
            }}
          >
            + Add Item
          </button>
        </div>
        <section className="todos-section">
          {todos.length === 0 ? (
            <h1>You have 0 todo item</h1> 
          ) : (
            todos.map((todo, index) => {
              return <Todo key={index} text={todo.task} id={todo.todo_id} getAllTodo = {getAllTodo} />;
            })
          )}
        </section>
      </main>
    </>
  );
}
