import React, { useEffect, useState } from "react";
import useHttp from "./components/hooks/use-http";
import NewTask from "./components/NewTask/NewTask";
import Tasks from "./components/Tasks/Tasks";

export interface Task {
  id: string;
  text: string;
}
function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { isLoading, error, sendRequest: fetchTasks } = useHttp();

  useEffect(() => {
    const transformTasks = (tasksObj: Task[]) => {
      const loadedTasks = [];

      for (const taskKey in tasksObj) {
        loadedTasks.push({ id: taskKey, text: tasksObj[taskKey].text });
      }

      setTasks(loadedTasks);
    };

    fetchTasks(
      {
        url: "https://learn-reactjs-5f78b-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json",
      },
      transformTasks
    );
  }, [fetchTasks]);

  const taskAddHandler = (task: Task) => {
    setTasks((prevTasks: Task[]) => prevTasks.concat(task));
  };
  
  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
