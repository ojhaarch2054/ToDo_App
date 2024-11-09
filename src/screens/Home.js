import "./Home.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Rows from "../components/Row.js";
import { useUser } from "../context/useUser";
import "bootstrap/dist/css/bootstrap.min.css";

const url = "http://localhost:3001";

function Home() {
  const { user } = useUser();
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        alert(error.response.data.error ? error.response.data.error : error);
      });
  }, []);

  //to add tasks
  const addTask = () => {
    const headers = { headers: { Authorization: user.token } };
    axios
      .post(
        url + "/create",
        {
          description: task,
        },
        headers
      )
      .then((response) => {
        setTasks([...tasks, { id: response.data.id, description: task }]);
        setTask("");
      })
      .catch((error) => {
        alert(error.response.data.error ? error.response.data.error : error);
      });
  };

  //to delete tasks
  const deleteTask = (id) => {
    const headers = { headers: { Authorization: user.token } };
    axios
      .delete(url + "/delete/" + id, headers)
      .then((response) => {
        const withoutRemoved = tasks.filter((item) => item.id !== id);
        setTasks(withoutRemoved);
      })
      .catch((error) => {
        alert(error.response.data.error ? error.response.data.error : error);
      });
  };

  return (
    <div id="container" className="container">
      <h1 className="my-4">Todos</h1>
      <form className="mb-3">
        <input
          className="form-control"
          placeholder="Add new task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addTask();
            }
          }}
        />
      </form>

      <ul>
        {tasks.map((item) => (
          <Rows key={item.id} item={item} deleteTask={deleteTask} />
        ))}
      </ul>
    </div>
  );
}

export default Home;
