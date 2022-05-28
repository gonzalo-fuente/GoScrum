import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTask, getTasks } from "../../store/actions/tasksActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import TaskForm from "../TaskForm/TaskForm";

const CreateTask = () => {
  const dispatch = useDispatch();
  const { created } = useSelector((state) => state.tasksReducer);

  useEffect(() => {
    if (created) {
      toast.success("Task Created Succesfully");
      dispatch(getTasks(""));
    }
  }, [created]);

  const handleSubmit = (task) => {
    dispatch(createTask(task));
  };

  return (
    <section className="overflow-hidden mx-auto mt-4 w-full">
      <TaskForm atSubmit={handleSubmit} reset={created} />
      <ToastContainer />
    </section>
  );
};

export default CreateTask;
