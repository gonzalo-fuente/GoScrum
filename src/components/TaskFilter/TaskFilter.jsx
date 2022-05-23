import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getTasks } from "../../store/actions/tasksActions";
import debounce from "lodash.debounce";

const TaskFilter = ({ taskList, setFilteredList }) => {
  const [titleSearch, setTitleSearch] = useState("");
  const [createdBy, setCreatedBy] = useState("ALL");

  const dispatch = useDispatch();

  useEffect(() => {
    if (titleSearch) {
      setFilteredList(
        taskList.filter((task) => task.title.startsWith(titleSearch))
      );
    } else {
      setFilteredList(taskList);
    }
  }, [titleSearch]);

  useEffect(() => {
    dispatch(getTasks(createdBy === "ALL" ? "" : "me"));
  }, [createdBy]);

  const handleChangeCreatedBy = (event) => {
    setCreatedBy(event.currentTarget.value);
  };

  const handleSearchByTitle = debounce((event) => {
    setTitleSearch(event?.target?.value);
  }, 500);

  const handleChangePriority = (event) => {
    if (event.currentTarget.value === "ALL") {
      setFilteredList(taskList);
    } else {
      setFilteredList(
        taskList.filter((task) => task.importance === event.currentTarget.value)
      );
    }
  };

  return (
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
  );
};

export default TaskFilter;
