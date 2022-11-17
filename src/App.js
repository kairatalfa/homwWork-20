import { useEffect } from "react";
import { useState } from "react";
import "./index.css";
function App() {
  const [todos, setTodos] = useState([]);
  const [value, setValue] = useState("");
  const postHandler = async (e) => {
    e.preventDefault();
    try {
      await fetch("https://fake-api-backend.herokuapp.com/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: value }),
      });
    } catch (error) {
      return console.log("error");
    }
    setValue("");
    getHandler();
  };

  const deleteHandler = async (id) => {
    await fetch(`https://fake-api-backend.herokuapp.com/users/${id}`, {
      method: "DELETE",
    });
    getHandler();

    // console.log(result);
  };

  const getHandler = async () => {
    try {
      const promise = await fetch(
        "https://fake-api-backend.herokuapp.com/users"
      );
      const result = await promise.json();

      const array = result.map((item) => {
        return { name: item.name, id: item.id };
      });
      // for (let key in result) {
      //   array.push({
      //     id: key,
      //     task: result[key].name,
      //   });
      // }
      setTodos(array);
    } catch (error) {
      alert("error");
    }
  };
  useEffect(() => {
    getHandler();
  }, []);

  return (
    <div className="app">
      <form onSubmit={postHandler}>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </form>
      <div>
        {todos.map((item) => {
          console.log(todos);
          return (
            <div key={item.id}>
              {item.name}

              <button onClick={() => deleteHandler(item.id)}>DELETE</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default App;
