import type { NextPage } from "next";
import React, { useState, useEffect } from "react";
import { uuid } from "uuidv4";
import { v4 } from "uuid";
import Axios from "axios";
import Task from "../../components/Task";
import { useRouter } from "next/router";

interface ITask {
  title: string;
  description: string;
  status: string;
  taskId: string;
}

interface ITodoList {
  title: string;
  description: string;
  url: string;
  tasks: Array<ITask>;
}
/*
export const getStaticPaths = async (context: string) => {
  console.log("the context " + context);
  console.log(context);
  const res = await fetch(`https://sheltered-inlet-32387.herokuapp.com/api/list/`);
  const data = await res.json();

  const paths = data.map((list: ITodoList) => {
    return {
      params: { id: list.url },
    };
  });

  return {
    paths,
    fallback: false,
  };
};*/
/*
export const getStaticProps = async (context: any) => {
  const id = context.params.id;
  const res = await fetch(`https://sheltered-inlet-32387.herokuapp.com/api/list/${id}`);
  const data = await res.json();
  return {
    props: { todoList: data[0] },
  };
};
*/

export const getServerSideProps = async (context: any) => {
  
  const id = context.params.id;
  console.log(context);
  const tempID = "e37c7c59-9c4e-4d1a-8458-f61cf94cafad";
  const res = await fetch(`https://sheltered-inlet-32387.herokuapp.com/api/list/${id}`);
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
  const [lisOfTasks, setListOfTasks] = useState<ITask[]>([]);
  const url = Math.random();
  
  //const url = uuid();
  const getUppdatedList = async () => {
    const res = await fetch(`https://sheltered-inlet-32387.herokuapp.com/api/list/${todoList.url}`);
    const data = await res.json();
    return data[0].tasks
  }  

  const createTask = () => {
    const task = {
      title: taskTitle,
      description: taskDescription,
      status: "todo",
      taskId: uuid(),
    };
    Axios.post(`https://sheltered-inlet-32387.herokuapp.com/api/list/add/${todoList.url}`, task)
      .then(() => console.log("adding task"))
      .then(() => uppdateListOfTasks())
      .catch((err) => {
        console.error(err);
      });
  };
  /*

  const uppdateTask = (task: ITask) => {
    console.log("uppddating task:  " + task.taskId);
    console.log("current task status:  " + task.status);
    console.log("uppddating task:  " + task.title);

    let tempStatus = "";
    if (task.status === "todo") {
      tempStatus = "done";
    } else {
      tempStatus = "todo";
    }
    Axios.post(`https://sheltered-inlet-32387.herokuapp.com/api/list/uppdate/${todoList.url}`, {
      status: tempStatus,
      taskId: task.taskId,
    })
      .then(() => console.log("uppdating task status"))
      .then(() => uppdateListOfTasks())
      .catch((err) => {
        console.error(err);
      });
  };

  */
  const uppdateListOfTasks = async () => {
    const tempList = await getUppdatedList();
    console.log(tempList);
    setListOfTasks([...tempList]);
    console.log("uppdating list of tasks");
  };
  /*
  <div>
        <p className="red important">
          Keep this url to access this todoList. You can send it to others if
          you want share your todolist
        </p>
      </div>
      <p className="blue important">URL: /lists/{todoList.url}</p>
      <h1>Todo List: </h1>
      <h2>Title: {todoList.title}</h2>
      <h3>Desc: {todoList.description}</h3>
      <div>
        <h3>Create a new Task:</h3>
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
          <p onClick={() => createTask()} className="orange-border">
            Create Task
          </p>
        </div>
      </div>
      <div>
        <div className="wrapper">
          <h3 className="colonHeader blue-background todoContainer">Todo</h3>
          <h3 className="colonHeader red-background finishedContainer">Done</h3>
        </div>
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
      </div>
      /*/

  /*
  useEffect(() => {
    uppdateListOfTasks();
    console.log("First render");
  }, []);
  useEffect(() => {
    console.log("rerender");
  }, [setListOfTasks]);
  */
  return (
    <div>
      <p>test</p>
    </div>
  );
};

export default TodoList;
