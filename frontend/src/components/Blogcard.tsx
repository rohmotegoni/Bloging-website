import { Link } from "react-router-dom";

interface Blogcardinterface {
  authorname: string;
  title: string;
  content: string;
  publishdate: string;
  id: string;
}

export const Blogcard = ({
  id,
  authorname,
  title,
  content,
  publishdate,
}: Blogcardinterface) => {
  return (
    <Link to={`/blog/${id}`}>
      <div className="border-b border-slate-200 pb-4 mt-4 max-w-full w-full ml-15 cursor-pointer">
        <div>
          <div className="flex items-center">
            <div className="flex justify-center flex-col">
              <Avatar name="harkirat" size={20} />
            </div>
            <div className="pl-2 font-light">{authorname}</div>
            <div className="flex justify-center flex-col pl-3">
              <Cicle />
            </div>
            <div className="pl-2 font-thin text-slate-500">{publishdate}</div>
          </div>
        </div>
        <div className="text-xl font-semibold pt-3">{title}</div>
        <div className="text-md font-thin">{content.slice(0, 100) + "..."}</div>
        <div className="text-slate-500 font-thin text-sm pt-2">{`${Math.ceil(
          content.length / 100
        )} minute's  read`}</div>
      </div>
    </Link>
  );
};
export function Avatar({ name, size }: { name: string; size: number }) {
  return (
    <div
      className={`relative inline-flex items-center justify-center
        text-sm overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}
      style={{ width: size, height: size }} // Use inline styles for dynamic sizing
    >
      <span className="font-medium text-gray-600 dark:text-gray-300">
        {name[0]}
      </span>
    </div>
  );
}

function Cicle() {
  return <div className="h-1 w-1 rounded-full bg-slate-500"></div>;
}
