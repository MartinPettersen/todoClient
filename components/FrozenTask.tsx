import Navbar from "../components/Navbar";

import Link from "next/link";
interface ITask {
  title: string,
  description: string;
  status: string;
  taskId: string;
  cost?: number;
}

type TaskProp = {
  todoTask: ITask;
};
const FrozenTask: React.FunctionComponent<TaskProp> = ({ todoTask}) => {
  return (
  <div className={`taskContent ${todoTask.status}-background`}>
    <div className="taskText">

    <h3>{todoTask.title}</h3>
    <p >{todoTask.description}</p>
    <p >{todoTask.cost}</p>
    </div>
  </div>
  );
};

export default FrozenTask;
