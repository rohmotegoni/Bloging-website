import { Appbar } from "../components/Appbar";
import { Blogcard } from "../components/Blogcard";
import { BlogcardSkeleton } from "../components/skeleton";
import { Useblogs } from "../hooks/hook1";

export const Blogs = () => {
  const { loading, blogs } = Useblogs();

  if (loading) {
    return (
      <div>
        <BlogcardSkeleton />
        <BlogcardSkeleton />
        <BlogcardSkeleton />
        <BlogcardSkeleton />
        <BlogcardSkeleton />
        <BlogcardSkeleton />
      </div>
    );
  }

  return (
    <div>
      <Appbar />
      <div className="flex justify-center cursor-pointer">
        <div className="w-full max-w-screen-lg pt-3">
          {blogs.map((blog) => (
            <Blogcard
              id={blog.id}
              key={blog.id} // Unique key for each blog
              authorname={blog.author.name || "harkiart"}
              publishdate={new Date().toLocaleDateString()} // Placeholder for actual publish date
              title={blog.title}
              content={blog.content}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
