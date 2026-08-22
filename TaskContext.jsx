import { createContext, useCallback, useEffect, useReducer } from "react";
import { getTasks } from "../api/tasks";

export const TaskContext = createContext(null);

const initialState = {
  tasks: [],
  loading: true,
  error: null,
};

function taskReducer(state, action) {
  switch (action.type) {
    case "FETCH_START":
      return {
        ...state,
        loading: true,
        error: null,
      };

    case "FETCH_SUCCESS":
      return {
        ...state,
        tasks: action.payload,
        loading: false,
        error: null,
      };

    case "FETCH_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case "ADD_TASK":
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };

    case "MOVE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id
            ? { ...task, status: action.payload.status }
            : task
        ),
      };

    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };

    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

export function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  const loadTasks = useCallback(async () => {
    dispatch({ type: "FETCH_START" });

    try {
      const tasks = await getTasks();

      dispatch({
        type: "FETCH_SUCCESS",
        payload: tasks,
      });
    } catch (error) {
      dispatch({
        type: "FETCH_ERROR",
        payload: error.message || "Unable to load tasks.",
      });
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const addTask = (task) => {
    dispatch({
      type: "ADD_TASK",
      payload: task,
    });
  };

  const moveTask = (id, status) => {
    dispatch({
      type: "MOVE_TASK",
      payload: {
        id,
        status,
      },
    });
  };

  const deleteTask = (id) => {
    dispatch({
      type: "DELETE_TASK",
      payload: id,
    });
  };

  return (
    <TaskContext.Provider
      value={{
        tasks: state.tasks,
        loading: state.loading,
        error: state.error,
        addTask,
        moveTask,
        deleteTask,
        reloadTasks: loadTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}