import { axiosInstance } from "../../utils/axios";
import {
  TASKS_REQUEST,
  TASKS_SUCCESS,
  TASKS_FAILURE,
  TASK_CREATED,
} from "../types";

export const tasksRequest = () => ({
  type: TASKS_REQUEST,
});

export const tasksSuccess = (data) => ({
  type: TASKS_SUCCESS,
  payload: data,
});

export const tasksFailure = (error) => ({
  type: TASKS_FAILURE,
  payload: error,
});

export const taskCreated = () => ({
  type: TASK_CREATED,
});

export const getTasks = (path) => async (dispatch) => {
  dispatch(tasksRequest());

  const token = sessionStorage.getItem("token");
  if (token) {
    axiosInstance.defaults.headers["Authorization"] = "Bearer " + token;
  }
  try {
    const response = await axiosInstance.get(`/task/${path}`);
    if (response.status === 200) {
      dispatch(tasksSuccess(response.data.result));
    }
  } catch (error) {
    dispatch(tasksFailure(error));
  }
};

export const createTask = (data) => async (dispatch) => {
  dispatch(tasksRequest());

  const token = sessionStorage.getItem("token");
  if (token) {
    axiosInstance.defaults.headers["Authorization"] = "Bearer " + token;
  }
  try {
    const response = await axiosInstance.post(`/task/`, JSON.stringify(data));
    if (response.status === 200) {
      dispatch(taskCreated());
    }
  } catch (error) {
    dispatch(tasksFailure(error));
  }
};

export const editTask = (data, type) => async (dispatch) => {
  dispatch(tasksRequest());

  const task = {
    task: {
      title: data.title,
      importance: data.importance,
      status: data.status,
      description: data.description,
    },
  };

  switch (type) {
    case "status":
      const newStatus =
        data.status === "NEW"
          ? "IN PROGRESS"
          : data.status === "IN PROGRESS"
          ? "FINISHED"
          : "NEW";

      task.task.status = newStatus;
      break;

    case "importance":
      const newImportance =
        data.importance === "LOW"
          ? "MEDIUM"
          : data.importance === "MEDIUM"
          ? "HIGH"
          : "LOW";

      task.task.importance = newImportance;
      break;

    case "task":
      task.task = { ...data.task };
      break;

    default:
      break;
  }

  const token = sessionStorage.getItem("token");
  if (token) {
    axiosInstance.defaults.headers["Authorization"] = "Bearer " + token;
  }
  try {
    const response = await axiosInstance.patch(
      `/task/${data._id}`,
      JSON.stringify(task)
    );
    if (response.status === 200) {
      if (type === "task") {
        dispatch(taskCreated());
      } else {
        dispatch(getTasks(""));
      }
    }
  } catch (error) {
    dispatch(tasksFailure(error));
  }
};

export const deleteTask = (id) => async (dispatch) => {
  dispatch(tasksRequest());

  const token = sessionStorage.getItem("token");
  if (token) {
    axiosInstance.defaults.headers["Authorization"] = "Bearer " + token;
  }
  try {
    const response = await axiosInstance.delete(`/task/${id}`);
    if (response.status === 200) {
      dispatch(getTasks(""));
    }
  } catch (error) {
    dispatch(tasksFailure(error));
  }
};
