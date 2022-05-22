import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getTasks,
  deleteTask,
  editTask,
} from "../../../store/actions/tasksActions";

import debounce from "lodash.debounce";
import swal from "sweetalert";
import Card from "../../Card/Card";
import Header from "../../Header/Header";
import TaskForm from "../../TaskForm/TaskForm";
import SkeletonCards from "../../SkeletonCards/SkeletonCards";

const Tasks = () => {
  const [taskList, setTaskList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [createdBy, setCreatedBy] = useState("ALL");
  const [titleSearch, setTitleSearch] = useState("");

  const dispatch = useDispatch();
  const { loading, tasks, error } = useSelector((state) => state.tasksReducer);

  useEffect(() => {
    dispatch(getTasks(createdBy === "ALL" ? "" : "me"));
  }, [createdBy]);

  useEffect(() => {
    setTaskList(tasks);
    setFilteredList(tasks);
  }, [tasks]);

  useEffect(() => {
    if (titleSearch) {
      setFilteredList(
        taskList.filter((task) => task.title.startsWith(titleSearch))
      );
    } else {
      setFilteredList(taskList);
    }
  }, [titleSearch]);

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

  const handleChangePriority = (event) => {
    if (event.currentTarget.value === "ALL") {
      setFilteredList(taskList);
    } else {
      setFilteredList(
        taskList.filter((task) => task.importance === event.currentTarget.value)
      );
    }
  };

  const handleChangeCreatedBy = (event) => {
    setCreatedBy(event.currentTarget.value);
  };

  const handleSearchByTitle = debounce((event) => {
    setTitleSearch(event?.target?.value);
  }, 500);

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
        <TaskForm />
        <section className="w-full mx-auto mt-4 lg:col-span-2">
          <h2 className="text-lg font-semibold mb-4">My Tasks</h2>
          {/* Task Filter */}
          <form className="flex flex-col gap-4 items-start mb-4 lg:flex-row lg:items-center">
            {/* Filter by Task created by */}
            <fieldset className="flex gap-4 shrink-0">
              <legend className="sr-only">User created Filter</legend>
              <div className="flex items-center">
                <input
                  id="all-users"
                  name="created-by"
                  type="radio"
                  value="ALL"
                  className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
                  checked={createdBy === "ALL"}
                  onChange={handleChangeCreatedBy}
                />
                <label
                  htmlFor="all-users"
                  className="block ml-2 text-sm font-medium text-gray-700"
                >
                  All Users
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="my-tasks"
                  name="created-by"
                  type="radio"
                  value="MY-TASKS"
                  className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
                  checked={createdBy === "MY-TASKS"}
                  onChange={handleChangeCreatedBy}
                />
                <label
                  htmlFor="my-tasks"
                  className="block ml-2 text-sm font-medium text-gray-700"
                >
                  My Tasks
                </label>
              </div>
            </fieldset>

            {/* Filter by Title */}
            <input
              className="block w-full py-2 px-3 text-gray-700 border rounded-2xl border-gray-300 placeholder:text-gray-700"
              type="text"
              name="title"
              placeholder="Filter by Title"
              onChange={handleSearchByTitle}
            />

            {/* Filter by Priority */}
            <select
              className="block w-full text-gray-700 py-2 px-3 border bg-inherit border-gray-300 rounded-2xl shadow-sm"
              name="imṕortance"
              onChange={handleChangePriority}
            >
              <option value="" disabled selected hidden>
                Filter by Priority
              </option>
              <option value="ALL">All</option>
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>
          </form>
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
