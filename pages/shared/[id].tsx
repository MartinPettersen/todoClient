import type { NextPage } from "next";
import React, { useState, useEffect } from "react";
import { uuid } from "uuidv4";
import { v4 } from "uuid";
import Axios from "axios";
import Task from "../../components/Task";
import { useRouter } from "next/router";
import FrozenTask from "../../components/FrozenTask";

interface ITask {
  title: string;
  description: string;
  status: string;
  taskId: string;
  cost: number;
}

interface ITodoList {
  title: string;
  description: string;
  url: string;
  tasks: Array<ITask>;
  totalCost: number;
  sharedUrl: string;
  readOnly: boolean;
}

export const getServerSideProps = async (context: any) => {
  const id = context.params.id;
  const tempID = "e37c7c59-9c4e-4d1a-8458-f61cf94cafad";
  const res = await fetch(
    `https://sheltered-inlet-32387.herokuapp.com/api/list/shared/${id}`
  );
  const data = await res.json();

  return {
    props: { todoList: data[0] },
  };
};

type TodoListProp = {
  todoList: ITodoList;
};

const TodoList: NextPage<TodoListProp> = ({ todoList }) => {
  const router = useRouter();

  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskCost, setTaskCost] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [isFrozen, setIsFrozen] = useState(todoList.readOnly);

  const [lisOfTasks, setListOfTasks] = useState<ITask[]>([]);
  const url = Math.random();

  const getUppdatedList = async () => {
    const res = await fetch(
      `https://sheltered-inlet-32387.herokuapp.com/api/list/${todoList.url}`
    );
    const data = await res.json();
    setTotalCost(data[0].totalCost);
    return data[0].tasks;
  };

  const checkForFrozen = async () => {
    const tempList = await fetch(
      `https://sheltered-inlet-32387.herokuapp.com/api/list/shared/${todoList.url}`
    );
    const tempData = await tempList.json();
    return isFrozen;
  };

  const uppdateListOfTasks = async () => {
    const tempList = await getUppdatedList();
    setListOfTasks(tempList);
  };

  const createTask = () => {
    const task = {
      title: taskTitle,
      description: taskDescription,
      status: "todo",
      taskId: Math.random(),
    };
    fetch(
      `https://sheltered-inlet-32387.herokuapp.com/api/list/add/${todoList.url}`,
      {
        method: "POST",
        headers: {
          Accept: "application.json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: taskTitle,
          description: taskDescription,
          status: "todo",
          taskId: Math.random(),
          cost: taskCost,
        }),
        cache: "default",
      }
    )
      .then(() => console.log("adding task"))
      .then(() => uppdateListOfTasks());
  };

  const uppdateTask = async (task: ITask) => {
    let tempStatus = "";
    if (task.status === "todo") {
      tempStatus = "done";
    } else {
      tempStatus = "todo";
    }

    await fetch(
      `https://sheltered-inlet-32387.herokuapp.com/api/list/uppdate/${todoList.url}`,
      {
        method: "POST",
        headers: {
          Accept: "application.json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: tempStatus,
          taskId: task.taskId,
        }),
        cache: "default",
      }
    )
      .then(() => console.log("uppdating task status"))
      .then(() => uppdateListOfTasks())
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    uppdateListOfTasks();
  }, []);

  useEffect(() => {
    const refreshInterval = setInterval(() => {
      setIsFrozen(todoList.readOnly);
      checkForFrozen();
      uppdateListOfTasks();
    }, 3000);

    return () => clearInterval(refreshInterval);
  }, []);

  useEffect(() => {
    console.log("rerender");
  }, [setListOfTasks]);

  return (
    <div>
      <div></div>
      <p className="orange important">
        URL to share with others:
        https://todoclient-mountain-spring.herokuapp.com/shared/
        {todoList.sharedUrl}
      </p>

      <h2 className="orange">Title: {todoList.title}</h2>
      <h3 className="orange">Desc: {todoList.description}</h3>
      <h3 className="orange">Current Total Cost: {totalCost}</h3>

      {isFrozen ? (
        <div>
          <p className="red">You dont have permission</p>
        </div>
      ) : (
        <div>
          <h1>Create a new Task:</h1>
          <div className="inputContainer">
            <div className="wrapper">
              <p className="text orange">Title:</p>
              <input
                className="taskTitle"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
              />
            </div>
            <div className="wrapper">
              <p className="text orange">Description:</p>
              <input
                className="taskDescription"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
              />
            </div>
            <div className="wrapper">
              <p className="text orange">Cost:</p>
              <input
                className="taskCost"
                value={taskCost}
                onChange={(e) => setTaskCost(Number(e.target.value))}
              />
            </div>
          </div>
          <div className="orange-create-task">
            <h2 onClick={() => createTask()} className="orange-border">
              Create Task
            </h2>
          </div>
        </div>
      )}
      <div>
        <div className="wrapper">
          <h3 className="colonHeader  red-background todoContainer">Todo</h3>
          <h3 className="colonHeader blue-background finishedContainer">
            Done
          </h3>
        </div>
        {isFrozen ? (
          <div>
            <div className="wrapper">
              <div className="todoContainer taskContainer">
                <div>
                  {lisOfTasks
                    .filter((task) => task.status === "todo")
                    .map((task) => (
                      <FrozenTask key={task.taskId} todoTask={task} />
                    ))}
                </div>
              </div>
              <div className="finishedContainer taskContainer">
                {lisOfTasks
                  .filter((task) => task.status === "done")
                  .map((task) => (
                    <FrozenTask key={task.taskId} todoTask={task} />
                  ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="wrapper">
            <div className="todoContainer taskContainer">
              <div>
                {lisOfTasks
                  .filter((task) => task.status === "todo")
                  .map((task) => (
                    <Task
                      key={task.taskId}
                      uppdateTask={uppdateTask}
                      todoTask={task}
                    />
                  ))}
              </div>
            </div>
            <div className="finishedContainer taskContainer">
              {lisOfTasks
                .filter((task) => task.status === "done")
                .map((task) => (
                  <Task
                    key={task.taskId}
                    uppdateTask={uppdateTask}
                    todoTask={task}
                  />
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoList;
