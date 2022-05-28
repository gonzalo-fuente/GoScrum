import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../../../utils/axios";
import BrandPage from "../../../BrandPage/BrandPage";
import swal from "sweetalert";
import LoginForm from "../../../LoginForm/LoginForm";

const Login = () => {
  const navigate = useNavigate();

  const loginUser = async (values) => {
    const user = { ...values };
    try {
      const response = await axiosInstance.post(
        "/auth/login",
        JSON.stringify(user)
      );
      if (response.status === 200) {
        const data = response.data.result;
        localStorage.setItem("token", data.token);
        localStorage.setItem("userName", data.user.userName);
        navigate("/", { replace: true });
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
          title: "User Name or Password Incorrect",
          icon: "error",
        });
      } else if (err.response?.status === 404) {
        /* Not found */
        swal({
          title: "User Not Found",
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

  return (
    <BrandPage>
      <div className="m-auto w-full md:w-1/2">
        <LoginForm atSubmit={loginUser} />
      </div>
    </BrandPage>
  );
};

export default Login;
