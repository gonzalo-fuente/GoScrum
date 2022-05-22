import { Link } from "react-router-dom";
import notFound from "../../../assets/404.svg";

const NotFound = () => {
  return (
    <div className="container mx-auto h-screen pt-32 md:pt-0 px-6 z-10 flex items-center justify-between">
      <div className="container mx-auto px-6 flex flex-col-reverse lg:flex-row justify-between items-center relative">
        <div className="w-full mb-16 md:mb-8 text-center lg:text-left">
          <h1 className="font-light text-center lg:text-left text-5xl lg:text-8xl mt-12 md:mt-0 text-gray-700">
            Sorry, this page isn&#x27;t available
          </h1>
          <Link to="/" replace={true}>
            <button className="block bg-primary-500 mx-auto mt-8 py-4 px-8 rounded-2xl text-white font-semibold mb-2 hover:bg-primary-700 transition ease-in duration-200 lg:mx-0">
              Take me home !
            </button>
          </Link>
        </div>
        <div className="block w-full mx-auto md:mt-0 relative max-w-md lg:max-w-2xl">
          <img src={notFound} alt="not found" />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
