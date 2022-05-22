import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonCard = () => {
  return (
    <div className="mx-auto max-w-md mt-4 text-xs p-6 bg-white rounded-lg border border-gray-200 shadow-md relative">
      <h5 className="mb-2 text-sm font-bold tracking-tight ">
        <Skeleton />
      </h5>
      <time className="">
        <Skeleton />
      </time>
      <p>
        <Skeleton />
      </p>
      <div className="mt-2 mb-2"></div>
      <p className="mb-3 font-normal">
        <Skeleton count={3} />
      </p>
    </div>
  );
};

export default SkeletonCard;
