import React, { useState, useEffect } from "react";

const App = () => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [title, setTitle] = useState("");
  const [searchTodo, setsearchTodo] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (title) {
      setTodos([...todos, { title, date: new Date(), status: "Pending" }]);
      setTitle("");
    } else {
      alert("Title is required!");
    }
  };

  const toggleStatus = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].status =
      updatedTodos[index].status === "Pending" ? "Completed" : "Pending";
    setTodos(updatedTodos);
  };

  const filteredTodos = todos
    .filter((todo) =>
      todo.title.toLowerCase().includes(searchTodo.toLowerCase())
    )
    .sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1 style={{textAlign: "center"}}>To-Do App</h1>
      <div style={{textAlign: "center"}}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <button onClick={addTodo}>Add To-Do</button>
      </div>
      <div style={{ margin: "20px 0", textAlign: "center"}}>
        <input
          type="text"
          placeholder="Search by title"
          value={searchTodo}
          onChange={(e) => setsearchTodo(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <button onClick={() => setSortOrder("asc")}>Sort Asc</button>
        <button
          onClick={() => setSortOrder("desc")}
          style={{ marginLeft: "10px" }}
        >
          Sort Desc
        </button>
      </div>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {filteredTodos.map((todo, index) => (
          <li
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            <div>
              <strong>{todo.title}</strong> -{" "}
              {new Date(todo.date).toLocaleString()} -{" "}
              <span
                style={{ color: todo.status === "Pending" ? "red" : "green" }}
              >
                {todo.status}
              </span>
            </div>
            <button onClick={() => toggleStatus(index)}>Toggle Status</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
