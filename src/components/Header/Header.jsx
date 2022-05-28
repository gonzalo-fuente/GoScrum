import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import HamburguerMenu from "../HamburguerMenu/HamburguerMenu";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { tasks } = useSelector((state) => state.tasksReducer);

  const handleLogOut = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userName");
    navigate("/login", { replace: true });
  };

  return (
    <header>
      <nav className="bg-gradient-to-r from-primary-50 to-primary-300 px-2 sm:px-4 py-2.5">
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <span className="self-center whitespace-nowrap">
            <h3 className="text-white text-xl italic">
              <span className="text-2xl text-primary-500 font-bold">Go</span>
              Scrum
            </h3>
          </span>
          <div className="block md:hidden">
            <HamburguerMenu
              isMenuOpen={isMenuOpen}
              setIsMenuOpen={setIsMenuOpen}
            />
          </div>
          <div
            className={`${!isMenuOpen && "hidden"} w-full md:block md:w-auto`}
          >
            <ul className="flex flex-col text-white mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
              <li>
                <p className="block py-2 pr-4 pl-3 border-b border-gray-100 md:border-0  md:p-0">
                  {`Total Tasks: ${tasks.length}`}
                </p>
              </li>
              <li className="flex items-center gap-2 py-2 pl-3 border-b border-gray-100 md:border-0 md:p-0">
                <FaUser className="" />
                <p className="">{sessionStorage.getItem("userName")}</p>
              </li>
              <li>
                <button
                  className="w-full text-left py-2 pr-4 pl-3 text-white hover:text-primary-900 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:p-0"
                  onClick={handleLogOut}
                >
                  Log Out
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
