import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Signupinput } from "../../../common/src/zod";

import axios from "axios";
import { BACKEND_URL } from "../config";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  let navigate = useNavigate();
  let [postinputs, setpostinputs] = useState<Signupinput>({
    username: "",
    password: "",
    name: "",
  });
  async function sendrequest() {
    try {
      let response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,
        postinputs
      );
      let jwt = response.data.token;
      localStorage.setItem("token", jwt);
      navigate("/blogs");
    } catch (error) {}
  }
  return (
    <div className="flex justify-center flex-col h-screen">
      <div>
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <div className="text-center font-extrabold text-3xl">
              Create an account
            </div>
            <div className="text-slate-500 p-3 text-center">
              {type === "signup"
                ? "Already have an account?"
                : "Don't have an account?"}
              <Link
                to={type === "signup" ? "/signin" : "/signup"}
                className="underline"
              >
                {type === "signup" ? "Login" : "Sign in"}
              </Link>
            </div>

            {/* Inputs section with labels aligned to the left */}
            <div className="space-y-4 mt-4 text-left">
              <Labeledinput
                label="Email"
                placeholder="Enter your Email"
                onchange={(e) => {
                  setpostinputs({
                    ...postinputs,
                    username: e.target.value,
                  });
                }}
              />

              <Labeledinput
                label="Password"
                placeholder="Enter your Password"
                onchange={(e) => {
                  setpostinputs({
                    ...postinputs,
                    password: e.target.value,
                  });
                }}
              />
              {type === "signup" ? (
                <Labeledinput
                  label="Name"
                  placeholder="Enter your Name"
                  type="password"
                  onchange={(e) => {
                    setpostinputs({
                      ...postinputs,
                      name: e.target.value,
                    });
                  }}
                />
              ) : null}
            </div>
            <button
              onClick={sendrequest}
              type="button"
              className="w-full mt-5 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              {type === "signup" ? "singup" : "Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface labeledinputype {
  label: string;
  placeholder: string;
  onchange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

function Labeledinput({ label, placeholder, onchange, type }: labeledinputype) {
  return (
    <div>
      <label className="block mb-2 text-sm font-semibold text-gray-900 dark:text-black">
        {label}
      </label>
      <input
        onChange={onchange}
        type={type || "text"}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        required
      />
    </div>
  );
}
