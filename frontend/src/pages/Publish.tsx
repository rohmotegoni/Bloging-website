import { ChangeEvent, useState } from "react";
import { Appbar } from "../components/Appbar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export const Publish = () => {
  const navigate = useNavigate();
  let [title, settitle] = useState("");
  let [description, setdescription] = useState("");

  return (
    <div>
      <Appbar></Appbar>
      <div className="flex justify-center w-full mt-10">
        <div className="mb-6 max-w-screen-lg w-full">
          <input
            onChange={(e) => {
              settitle(e.target.value);
            }}
            type="text"
            id="large-input"
            className="block w-full p-4 text-gray-900 border border-gray-500 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
      <Texteditor
        onChange={(e) => {
          setdescription(e.target.value);
        }}
      />
      <div className="flex justify-center">
        <button
          onClick={async () => {
            let response = await axios.post(
              `${BACKEND_URL}/api/v1/blog`,
              {
                title,
                content: description,
              },
              {
                headers: {
                  Authorization: localStorage.getItem("token"),
                },
              }
            );
            navigate(`/blog/${response.data.id}`);
          }}
          type="submit"
          className=" mt-4 px-5 py-2.5 text-sm font-medium text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
        >
          Publish post
        </button>
      </div>
    </div>
  );
};

export function Texteditor({
  onChange,
}: {
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <form>
      <div className="flex flex-col items-center">
        <textarea
          onChange={onChange}
          id="editor"
          rows={8}
          className="block w-[70%] px-4 py-2 text-sm text-gray-800 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Write an article..."
          required
        ></textarea>
      </div>
    </form>
  );
}
