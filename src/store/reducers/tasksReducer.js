import {
  TASKS_REQUEST,
  TASKS_SUCCESS,
  TASKS_FAILURE,
  TASK_CREATED,
} from "../types";

const initialState = {
  loading: false,
  created: false,
  tasks: [],
  error: null,
};

export const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case TASKS_REQUEST:
      return {
        ...state,
        loading: true,
        created: false,
      };

    case TASKS_SUCCESS:
      return {
        loading: false,
        tasks: action.payload,
        error: null,
      };

    case TASKS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case TASK_CREATED:
      return {
        ...state,
        created: true,
      };

    default:
      return state;
  }
};
