import { useFormik } from "formik";
import { useEffect } from "react";
import * as Yup from "yup";

const TaskForm = ({ atSubmit, reset }) => {
  const initialValues = {
    title: "",
    status: "",
    importance: "",
    description: "",
  };

  const onSubmit = () => {
    const task = {
      task: {
        ...values,
      },
    };
    atSubmit(task);
  };

  const required = "* This field is required";

  const validationSchema = Yup.object().shape({
    title: Yup.string().required(required),
    status: Yup.string().required(required),
    importance: Yup.string().required(required),
    description: Yup.string().required(required),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const {
    values,
    handleChange,
    handleSubmit,
    handleBlur,
    resetForm,
    touched,
    errors,
  } = formik;

  useEffect(() => {
    if (reset) {
      resetForm();
    }
  }, [reset]);

  return (
    <form
      className="text-sm p-5 mx-auto border-2 rounded-lg shadow-sm border-gray-100 bg-white"
      onSubmit={handleSubmit}
    >
      <h2 className="text-gray-800 text-lg font-semibold mb-1">Create Task</h2>
      <p className="text-sm font-normal text-gray-600 mb-7">
        Create your Team Tasks !
      </p>

      {/* Title */}
      <input
        className={`${
          errors.title && touched.title ? "border-red-500" : "border-gray-300"
        } block w-full py-2 px-3 mt-4 text-gray-700 border rounded-2xl placeholder:text-gray-700`}
        type="text"
        name="title"
        id="title"
        placeholder="Task Title"
        value={values.title}
        onChange={handleChange}
        onBlur={handleBlur}
      />

      {errors.title && touched.title && (
        <div className="text-sm text-red-500">{errors.title}</div>
      )}

      {/* Status */}
      <select
        className={`${
          errors.status && touched.status ? "border-red-500" : "border-gray-300"
        } block w-full text-gray-700 mt-4 py-2 px-3 border bg-inherit rounded-2xl shadow-sm`}
        name="status"
        data-testid="status"
        value={values.status}
        onChange={handleChange}
        onBlur={handleBlur}
      >
        <option value="" disabled selected hidden>
          Select a Status
        </option>
        <option value="NEW">New</option>
        <option value="IN PROGRESS">In Progress</option>
        <option value="FINISHED">Finished</option>
      </select>
      {errors.status && touched.status && (
        <div className="text-sm text-red-500">{errors.status}</div>
      )}

      {/* Importance */}
      <select
        className={`${
          errors.importance && touched.importance
            ? "border-red-500"
            : "border-gray-300"
        } block w-full text-gray-700 mt-4 py-2 px-3 border bg-inherit rounded-2xl shadow-sm`}
        name="importance"
        data-testid="importance"
        value={values.importance}
        onChange={handleChange}
        onBlur={handleBlur}
      >
        <option value="" disabled selected hidden>
          Select a Priority
        </option>
        <option value="LOW">Low</option>
        <option value="MEDIUM">Medium</option>
        <option value="HIGH">High</option>
      </select>
      {errors.importance && touched.importance && (
        <div className="text-sm text-red-500">{errors.importance}</div>
      )}

      {/* Description */}
      <textarea
        className={`${
          errors.description && touched.description
            ? "border-red-500"
            : "border-gray-300"
        } block w-full text-gray-700 mt-4 py-2 px-3 border rounded-2xl shadow-sm placeholder:text-gray-700`}
        name="description"
        placeholder="Description"
        value={values.description}
        onChange={handleChange}
        onBlur={handleBlur}
      ></textarea>
      {errors.description && touched.description && (
        <div className="text-sm text-red-500">{errors.description}</div>
      )}

      {/* Create Task */}
      <button type="submit" className="btn w-full mt-4 mb-2">
        Create Task
      </button>
    </form>
  );
};

export default TaskForm;
