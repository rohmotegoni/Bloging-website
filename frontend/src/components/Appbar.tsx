import { Avatar } from "./Blogcard";
import { Link } from "react-router-dom";
export const Appbar = () => {
  return (
    <div className="flex justify-between border-b px-10 py-4">
      <Link
        className="flex flex-col justify-center cursor-pointer"
        to={"/blogs"}
      >
        <div>Medium</div>
      </Link>
      <div>
        <Link to={`/publish`}>
          <button
            type="button"
            className=" mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Publish
          </button>
        </Link>
        <Avatar name="harkirat singh" size={40} />
      </div>
    </div>
  );
};
