import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getTasks,
  deleteTask,
  editTask,
} from "../../../store/actions/tasksActions";

import swal from "sweetalert";
import Card from "../../Card/Card";
import Header from "../../Header/Header";
import CreateTask from "../../CreateTask/CreateTask";
import SkeletonCards from "../../SkeletonCards/SkeletonCards";
import TaskFilter from "../../TaskFilter/TaskFilter";

const Tasks = () => {
  const [taskList, setTaskList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);

  const dispatch = useDispatch();
  const { loading, tasks, error } = useSelector((state) => state.tasksReducer);

  useEffect(() => {
    setTaskList(tasks);
    setFilteredList(tasks);
  }, [tasks]);

  const filterByStatus = (status) =>
    filteredList
      .filter((task) => task.status === status)
      .map((task) => (
        <Card
          key={task._id}
          data={task}
          deleteCard={handleDelete}
          editCardStatus={handleEditStatus}
        />
      ));

  const handleEditStatus = (data) => {
    dispatch(editTask(data));
  };

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  const handleErrors = (error) => {
    if (!error?.response) {
      swal({
        title: "No Server Response",
        icon: "error",
      });
    } else if (error.response?.status === 401) {
      /* Unauthorized */
      swal({
        title: "Unauthorized: Token Error",
        icon: "error",
      });
      console.log();
    } else if (error.response?.status === 404) {
      /* Not found */
      swal({
        title: error.response.data.message,
        icon: "error",
      });
    } else {
      swal({
        title: "Request Error, try again later",
        icon: "error",
      });
    }
  };

  if (error) {
    handleErrors(error);
  }

  return (
    <>
      <Header />
      <main className="px-4 mx-auto grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
        <CreateTask />
        <section className="w-full mx-auto mt-4 lg:col-span-2">
          <h2 className="text-lg font-semibold mb-4">My Tasks</h2>
          <TaskFilter taskList={taskList} setFilteredList={setFilteredList} />
          {/* Show Tasks */}
          {!filteredList?.length ? (
            <h3 className="text-base font-semibold mb-2">
              You don't have Tasks
            </h3>
          ) : (
            <div className="grid gap-4 justify-center lg:grid-cols-3">
              <div className="max-w-md">
                <h3 className="text-base font-semibold mb-2">New</h3>
                {loading ? <SkeletonCards /> : filterByStatus("NEW")}
              </div>
              <div className="max-w-md">
                <h3 className="text-base font-semibold mb-2">In Progress</h3>
                {loading ? <SkeletonCards /> : filterByStatus("IN PROGRESS")}
              </div>
              <div className="max-w-md">
                <h3 className="text-base font-semibold mb-2">Finished</h3>
                {loading ? <SkeletonCards /> : filterByStatus("FINISHED")}
              </div>
            </div>
          )}
        </section>
      </main>
    </>
  );
};

export default Tasks;
