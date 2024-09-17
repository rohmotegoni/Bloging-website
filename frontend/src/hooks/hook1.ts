import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export interface Blog {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
  };
}

// Define the type for the response from the API
interface BlogResponse {
  blog: Blog[];
}
export const Useblog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog[]>();
  const [error, setError] = useState<Error | null>(null); // Define the type for error state

  useEffect(() => {
    axios
      .get<BlogResponse>(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token") || "", // Ensure token is not null
        },
      })
      .then((response) => {
        setBlog(response.data.blog); // TypeScript now knows response has a `blogs` property
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching blogs:", err);
        setError(err); // Set the error state
        setLoading(false);
      });
  }, [id]);
  return {
    loading,
    blog,
    error, // Return the error state as well
  };
};
export const Useblogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [error, setError] = useState<Error | null>(null); // Define the type for error state

  useEffect(() => {
    axios
      .get<BlogResponse>(`${BACKEND_URL}/api/v1/blog/bulk`, {
        headers: {
          Authorization: localStorage.getItem("token") || "", // Ensure token is not null
        },
      })
      .then((response) => {
        setBlogs(response.data.blog); // TypeScript now knows response has a `blogs` property
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching blogs:", err);
        setError(err); // Set the error state
        setLoading(false);
      });
  }, []);

  return {
    loading,
    blogs,
    error, // Return the error state as well
  };
};
