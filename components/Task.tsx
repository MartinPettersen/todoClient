import Navbar from "../components/Navbar";

import Link from "next/link";
interface ITask {
  title: string,
  description: string;
  status: string;
  taskId: string;
}

type TaskProp = {
  todoTask: ITask;
  uppdateTask(task:ITask): void;
};
const Task: React.FunctionComponent<TaskProp> = ({ todoTask, uppdateTask }) => {
  return (
  <div onClick={() => uppdateTask(todoTask)} className={`taskContent ${todoTask.status}-background`}>
    <div className="taskText">

    <h3>{todoTask.title}</h3>
    <p >{todoTask.description}</p>
    </div>
  </div>
  );
};

export default Task;
