import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../../../utils/axios";
import { Switch } from "@headlessui/react";
import * as Yup from "yup";
import { v4 as uuid } from "uuid";
import BrandPage from "../../../BrandPage/BrandPage";
import swal from "sweetalert";

const Register = () => {
  const navigate = useNavigate();

  const registerUser = async () => {
    const teamID = values.teamID ? values.teamID : uuid();
    const user = {
      user: {
        ...values,
        teamID,
      },
    };
    delete user.user.switch;

    try {
      const response = await axiosInstance.post(
        "/auth/register",
        JSON.stringify(user)
      );
      if (response.status === 201) {
        const data = response.data.result;
        navigate("/registered/" + data.user.teamID, {
          replace: true,
        });
      }
    } catch (err) {
      if (!err?.response) {
        swal({
          title: "No Server Response",
          icon: "error",
        });
      } else if (err.response?.status === 401) {
        /* Unauthorized */
        swal({
          title: err.response.data.status_message,
          icon: "error",
        });
      } else if (err.response?.status === 404) {
        /* Not found */
        swal({
          title: err.response.data.status_message,
          icon: "error",
        });
      } else if (err.response?.status === 409) {
        /* Not found */
        swal({
          title: "The user already exists",
          icon: "error",
        });
      } else {
        swal({
          title: "Request Error, try again later",
          icon: "error",
        });
      }
    }
  };

  const initialValues = {
    userName: "",
    password: "",
    email: "",
    teamID: "",
    role: "",
    continent: "",
    region: "",
    switch: false,
  };

  const handleChangeContinent = (value) => {
    setFieldValue("continent", value);
    if (value !== "America") setFieldValue("region", "Otro");
  };

  const onSubmit = () => {
    registerUser();
  };

  const required = "* This field is required";

  const validationSchema = Yup.object().shape({
    userName: Yup.string()
      .min(4, "The User Name must have at least 4 characters")
      .required(required),
    password: Yup.string().required(required),
    email: Yup.string()
      .email("The Email format must be valid")
      .required(required),
    role: Yup.string().required(required),
    continent: Yup.string().required(required),
    region: Yup.string().required(required),
  });

  const formik = useFormik({ initialValues, validationSchema, onSubmit });
  const {
    values,
    handleChange,
    handleSubmit,
    handleBlur,
    setFieldValue,
    touched,
    errors,
  } = formik;

  return (
    <BrandPage>
      <div className="m-auto w-full md:w-1/2">
        <form
          className="p-5 max-w-2xl w-[95%] sm:w-[80%] lg:w-[80%] md:w-[90%] mx-auto border-2 rounded-lg shadow-sm border-gray-100 bg-white"
          onSubmit={handleSubmit}
        >
          <h2 className="text-gray-800 font-bold text-2xl mb-1">Register</h2>
          <p className="text-sm font-normal text-gray-600 mb-7">
            Welcome to our Team !
          </p>

          {/* UserName */}
          <input
            className={`${
              errors.userName && touched.userName
                ? "border-red-500"
                : "border-gray-300"
            } block w-full py-2 px-3 mt-4 text-gray-700 border rounded-2xl placeholder:text-gray-700`}
            type="text"
            name="userName"
            placeholder="User Name"
            value={values.userName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.userName && touched.userName && (
            <div className="text-sm text-red-500">{errors.userName}</div>
          )}

          {/* Password */}
          <input
            className={`${
              errors.password && touched.password
                ? "border-red-500"
                : "border-gray-300"
            } block w-full py-2 px-3 mt-4 text-gray-700 border rounded-2xl placeholder:text-gray-700`}
            type="password"
            name="password"
            placeholder="Password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          {errors.password && touched.password && (
            <div className="text-sm text-red-500">{errors.password}</div>
          )}

          {/* Email */}
          <input
            className={`${
              errors.email && touched.email
                ? "border-red-500"
                : "border-gray-300"
            } block w-full py-2 px-3 mt-4 text-gray-700 border rounded-2xl placeholder:text-gray-700`}
            type="text"
            name="email"
            placeholder="Email Address"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.email && touched.email && (
            <div className="text-sm text-red-500">{errors.email}</div>
          )}

          {/* Team ID Selection */}
          <Switch.Group>
            <div className="mt-4 flex items-center gap-2">
              <Switch
                name="switch"
                checked={values.switch}
                onChange={() => setFieldValue("switch", !values.switch)}
                className={`${
                  values.switch ? "bg-primary-500" : "bg-primary-200"
                }
          relative inline-flex h-[22px] w-[42px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-blue-500 focus-visible:ring-opacity-75`}
              >
                <span className="sr-only">Team ID Selection</span>
                <span
                  aria-hidden="true"
                  className={`${
                    values.switch ? "translate-x-5" : "translate-x-0"
                  }
            pointer-events-none inline-block h-[18px] w-[18px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                />
              </Switch>
              <Switch.Label passive className="text-gray-700">
                {values.switch
                  ? "I Already have a Team ID"
                  : "I don't have a Team ID"}
              </Switch.Label>
            </div>
          </Switch.Group>
          {values.switch && (
            <input
              className="block w-full py-2 px-3 mt-4 text-gray-700 border rounded-2xl border-gray-300 placeholder:text-gray-700"
              type="text"
              name="teamID"
              placeholder="Team ID"
              value={values.teamID}
              onChange={handleChange}
            />
          )}

          {/* Role */}
          <select
            className={`${
              errors.role && touched.role ? "border-red-500" : "border-gray-300"
            } block w-full text-gray-700 mt-4 py-2 px-3 border bg-white rounded-2xl shadow-sm`}
            name="role"
            value={values.role}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <option value="" disabled selected hidden>
              Select a Role
            </option>
            <option value="Team Leader">Team Leader</option>
            <option value="Team Member">Team Member</option>
          </select>
          {errors.role && touched.role && (
            <div className="text-sm text-red-500">{errors.role}</div>
          )}

          {/* Continent */}
          <select
            className={`${
              errors.continent && touched.continent
                ? "border-red-500"
                : "border-gray-300"
            } block w-full text-gray-700 mt-4 py-2 px-3 border bg-white rounded-2xl shadow-sm`}
            name="continent"
            value={values.continent}
            onChange={(event) =>
              handleChangeContinent(event.currentTarget.value)
            }
            onBlur={handleBlur}
          >
            <option value="" disabled selected hidden>
              Select a Continent
            </option>
            <option value="America">America</option>
            <option value="Europa">Europe</option>
            <option value="Otro">Other</option>
          </select>
          {errors.continent && touched.continent && (
            <div className="text-sm text-red-500">{errors.continent}</div>
          )}

          {/* Region */}
          {values.continent === "America" && (
            <>
              <select
                className={`${
                  errors.region && touched.region
                    ? "border-red-500"
                    : "border-gray-300"
                } block w-full text-gray-700 mt-4 py-2 px-3 border bg-white rounded-2xl shadow-sm`}
                name="region"
                value={values.region}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="" disabled selected hidden>
                  Select a Region
                </option>
                <option value="Latam">Latam</option>
                <option value="Brazil">Brazil</option>
                <option value="Otro">Other</option>
              </select>
              {errors.region && touched.region && (
                <div className="text-sm text-red-500">{errors.region}</div>
              )}
            </>
          )}

          {/* Register */}
          <button type="submit" className="btn w-full mt-4 mb-2">
            Register
          </button>
          <Link to="/login" replace={true}>
            <span className="text-sm hover:text-primary-500 cursor-pointer">
              Go to Log in page
            </span>
          </Link>
        </form>
      </div>
    </BrandPage>
  );
};

export default Register;
