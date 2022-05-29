import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createTask,
  editTask,
  getTasks,
} from "../../store/actions/tasksActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import TaskForm from "../TaskForm/TaskForm";

const CreateEditTask = ({ editId, setEditId }) => {
  const dispatch = useDispatch();
  const { created } = useSelector((state) => state.tasksReducer);

  useEffect(() => {
    if (created) {
      toast.success(`Task ${editId ? "Edited" : "Created"} Succesfully`);
      if (editId) {
        setEditId(null);
      }
      dispatch(getTasks(""));
    }
  }, [created]);

  const handleSubmit = (task) => {
    if (editId) {
      task._id = editId;
      dispatch(editTask(task, "task"));
    } else {
      dispatch(createTask(task));
    }
  };

  return (
    <section className="overflow-hidden mx-auto mt-4 w-full">
      <TaskForm
        atSubmit={handleSubmit}
        reset={created}
        editId={editId}
        setEditId={setEditId}
      />
      <ToastContainer />
    </section>
  );
};

export default CreateEditTask;
