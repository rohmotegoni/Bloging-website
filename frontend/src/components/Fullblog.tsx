import { Blog } from "../hooks/hook1";

import { Appbar } from "../components/Appbar";

export const Fullblog = ({ blog }: { blog: Blog }) => {
  return (
    <div>
      <Appbar></Appbar>
      <div className="flex justify-center mt-10">
        <div className="grid grid-cols-12 px-10 w-full max-w-screen-xl pt-200">
          <div className="col-span-8">
            <div className="text-4xl font-extrabold">{blog.title}</div>
            <div className="text-slate-500 pt-2">
              Posted on 2nd December 2023
            </div>
            <div className="pt-4">{blog.content}</div>
          </div>
          <div className="col-span-4">
            <div className="font-extrabold mb-4">Author</div>
            <div className="flex items-center">
              {/* Avatar and author information are in a flex row */}

              <div className="ml-4">
                {/* Adds a 1rem (16px) gap between avatar and text */}
                <div className="text-xl font-extrabold">{blog.author.name}</div>
                <div className="pt-2 text-slate-500">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Asperiores harum nobis, cupiditate unde praesentium molestias
                  nam? Ducimus dignissimos, iure eaque sed quia dolorem quaerat
                  in cumque cupiditate odit atque est?
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
