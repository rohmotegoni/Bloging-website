// Skeleton Loader for Blogcard
export const BlogcardSkeleton = () => {
  return (
    <div className="border-b border-slate-200 pb-4 mt-4 max-w-full w-full ml-15 cursor-pointer animate-pulse">
      <div>
        <div className="flex items-center">
          <div className="flex justify-center flex-col">
            <div className="bg-gray-300 rounded-full h-5 w-5"></div>
          </div>
          <div className="pl-2 font-light bg-gray-300 rounded h-4 w-32"></div>
          <div className="flex justify-center flex-col pl-3">
            <div className="bg-gray-300 rounded-full h-2 w-2"></div>
          </div>
          <div className="pl-2 font-thin text-slate-500 bg-gray-300 rounded h-4 w-20"></div>
        </div>
      </div>
      <div className="text-xl font-semibold pt-3 bg-gray-300 rounded h-6 w-3/4"></div>
      <div className="text-md font-thin bg-gray-300 rounded h-4 w-full mt-2"></div>
      <div className="text-slate-500 font-thin text-sm pt-2 bg-gray-300 rounded h-4 w-24 mt-2"></div>
    </div>
  );
};
