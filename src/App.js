import "./style.css";
import { useState } from "react";
import { useEffect } from "react";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  function handleChange(e) {
    setTodo(e.target.value);
  }

  function handleClick() {
    setTodos([...todos, todo]);
    //isCompleted: finish
    setTodo("");
    saveToLS();
  }

  function handleDelete(idx) {
    let newlist = todos.filter((item, i) => {
      return i !== idx;
    });
    setTodos(newlist);
    saveToLS();
  }

  function handleEdit(idx) {
    let t = todos.filter((i, id) => id === idx);
    setTodo(t[0]);
    let newlist = todos.filter((item, i) => {
      return i !== idx;
    });
    setTodos(newlist);
    saveToLS();
  }

  return (
    <>
      <div className="heading">My TODO App</div>

      <div className="overAll">
        <div className="content">
          <div className="addSection">
            <div className="titleName">Title</div>
            <div className="inputSection">
              <input
                type="text"
                value={todo}
                onChange={handleChange}
                placeholder="Add your item.."
                className="input"
              ></input>
              <button
                disabled={todo.length < 3}
                onClick={handleClick}
                className="Save btn"
              >
                Save
              </button>
            </div>
          </div>

          <div className="ListSection">
            <div className="titleName">Your todos</div>
            <div className="yourList">
              <ul className="list">
                {todos.length === 0 && <div>No item to display</div>}

                {todos.map((item, idx) => {
                  return (
                    <li key={idx} className="li">
                      <div className="chit">
                        <div className="checkbox">
                          <input type="checkbox"></input>
                        </div>
                        <div className="item">{item}</div>
                      </div>

                      <div className="buttons">
                        <button
                          onClick={() => {
                            handleEdit(idx);
                          }}
                          className="btn lbtn"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            handleDelete(idx);
                          }}
                          className="btn lbtn"
                        >
                          Delete
                        </button>
                      </div>

                      {saveToLS()}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
