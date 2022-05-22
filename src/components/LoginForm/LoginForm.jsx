import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import { FaLock, FaUser } from "react-icons/fa";

const LoginForm = ({ atSubmit }) => {
  const initialValues = {
    userName: "",
    password: "",
  };

  const onSubmit = (values) => {
    atSubmit(values);
  };

  const required = "* This field is required";

  const validationSchema = Yup.object().shape({
    userName: Yup.string()
      .min(4, "The User Name must have at least 4 characters")
      .required(required),
    password: Yup.string().required(required),
  });

  const formik = useFormik({ initialValues, validationSchema, onSubmit });
  const { values, handleChange, handleSubmit, handleBlur, errors, touched } =
    formik;

  return (
    <form
      className="p-5 max-w-2xl w-[95%] sm:w-[80%] lg:w-[80%] md:w-[90%] mx-auto border-2 rounded-lg shadow-sm border-gray-100 bg-white"
      onSubmit={handleSubmit}
    >
      <h2 className="text-gray-800 font-bold text-2xl mb-1">Hello Again!</h2>
      <p className="text-sm font-normal text-gray-600 mb-7">Welcome Back</p>

      {/* User Name */}
      <div
        className={`${
          errors.userName && touched.userName
            ? "border-red-500"
            : "border-gray-300"
        }
                flex items-center border py-2 px-3 rounded-2xl`}
      >
        <FaUser className="flex-shrink-0 text-gray-500" />
        <input
          className="flex-grow overflow-hidden pl-2 text-gray-700 outline-none border-none placeholder:text-gray-500"
          type="text"
          name="userName"
          placeholder="User Name"
          value={values.userName}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
      {errors.userName && touched.userName && (
        <div className="text-sm text-red-500">{errors.userName}</div>
      )}

      {/* Password */}
      <div
        className={`${
          errors.password && touched.password
            ? "border-red-500"
            : "border-gray-300"
        }
                flex items-center border mt-4 py-2 px-3 rounded-2xl`}
      >
        <FaLock className="flex-shrink-0 text-gray-600" />
        <input
          className="flex-grow overflow-hidden pl-2 text-gray-700 outline-none border-none placeholder:text-gray-500"
          type="password"
          name="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
      {errors.password && touched.password && (
        <div className="text-sm text-red-500">{errors.password}</div>
      )}

      {/* Login */}
      <button type="submit" className="btn w-full mt-4 mb-2">
        Log In
      </button>
      <Link to="/register" replace={true}>
        <span className="text-sm hover:text-primary-500 cursor-pointer">
          Register
        </span>
      </Link>
    </form>
  );
};

export default LoginForm;
