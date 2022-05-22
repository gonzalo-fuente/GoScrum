import { Link, useParams } from "react-router-dom";
import BrandPage from "../../../BrandPage/BrandPage";

const Registered = () => {
  const { teamID } = useParams();

  return (
    <BrandPage>
      <div className="m-auto p-5 w-full md:w-1/2">
        <h2 className="text-gray-800 font-bold text-2xl mb-1">
          Registration Succesfully!
        </h2>
        <p className="text-sm font-normal text-gray-600 mb-7">
          Your Team ID is: {teamID}
        </p>
        <Link to="/login" replace={true}>
          <span className="text-sm hover:text-primary-500 cursor-pointer">
            Go to Log in page
          </span>
        </Link>
      </div>
    </BrandPage>
  );
};

export default Registered;
