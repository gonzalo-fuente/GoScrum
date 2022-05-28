import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Card = ({
  deleteCard,
  editCard,
  data,
  data: {
    _id,
    title,
    createdAt,
    user: { userName },
    description,
    status,
    importance,
  },
}) => {
  const maxDescription = description.length > 170;
  const [readMore, setReadMore] = useState(maxDescription);
  const dateTime = new Date(createdAt).toLocaleString();

  const limitString = (str) => {
    if (str.length > 170) return str.slice(0, 167).concat("...");
    return str;
  };

  return (
    <div className="mx-auto max-w-md mt-4 text-xs text-gray-900 p-6 bg-white rounded-lg border border-gray-200 shadow-md relative">
      <div
        className="absolute top-4 right-4 cursor-pointer text-primary-500"
        onClick={() => deleteCard(_id)}
      >
        X
      </div>
      <h5 className="mb-2 text-sm font-bold tracking-tight ">{title}</h5>
      <time className="">{dateTime}</time>
      <p>{userName}</p>
      <div className="flex gap-2 mt-2 mb-2">
        <button
          className={`${
            status === "NEW"
              ? "bg-blue-500"
              : status === "IN PROGRESS"
              ? "bg-yellow-500"
              : "bg-green-500"
          } px-2 py-1 text-white rounded`}
          onClick={() => editCard(data, "status")}
        >
          {status}
        </button>
        <button
          className={`${
            importance === "HIGH"
              ? "bg-primary-500"
              : importance === "MEDIUM"
              ? "bg-yellow-500"
              : "bg-blue-500"
          } px-2 py-1 text-white rounded`}
          onClick={() => editCard(data, "importance")}
        >
          {importance}
        </button>
      </div>
      <p className="mb-3 font-normal text-gray-700">
        {readMore ? limitString(description) : description}
      </p>
      {maxDescription && (
        <button
          className="inline-flex items-center btn"
          onClick={() => setReadMore((prevState) => !prevState)}
        >
          {readMore ? "Read more" : "Read less"}
          {readMore ? (
            <FaChevronRight className="ml-2" />
          ) : (
            <FaChevronLeft className="ml-2" />
          )}
        </button>
      )}
    </div>
  );
};

export default Card;
