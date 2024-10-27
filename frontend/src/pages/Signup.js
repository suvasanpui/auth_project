import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";

function Signup() {
  //by default in sign information is null
  const [signupinfo, setsignupinfo] = useState({
    name: "",
    email: "",
    contact: "",
    password: "",
  });

  const navigate = useNavigate();

  //responsible for from input handle and store in a db in nodejs
  const handleSignup = async (e) => {
    e.preventDefault(); //without reload browser
    const { name, email, contact, password } = signupinfo;
    if (!name || !email || !contact || !password) {
      return handleError("All field are require");
    }

    try {
      //backend http url where user data store that are create in a node
      const url = "http://localhost:8000/auth/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupinfo),
      });
      const result = await response.json();
      console.log(result);
      const { token, message, error } = result;
      if (token) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message;
        return handleError(details);
      } else {
        return handleError("some error found");
      }
    } catch (err) {
      return handleError(err);
    }
  };

  //this function is responsible for store a value in useState hook array when i given a input in a form
  const handleChange = (e) => {
    const { name, value } = e.target;
    //console.log(name,value);
    const copysignupinfo = { ...signupinfo };
    copysignupinfo[name] = value;
    setsignupinfo(copysignupinfo);
  };

  return (
    <div>
      <div class="flex flex-col justify-center font-[sans-serif] sm:h-screen p-4">
        <div class="max-w-md w-full mx-auto border border-gray-300 rounded-2xl p-8">
          <div class="text-center mb-12"></div>
          <h2 class="text-gray-800 text-center text-2xl font-bold">
            Registration
          </h2>

          <form onSubmit={handleSignup}>
            <div class="space-y-6">
              <div>
                <label class="text-gray-800 text-sm mb-2 block">Name</label>
                <input
                  onChange={handleChange}
                  name="name"
                  type="text"
                  class="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                  placeholder="Enter Name"
                  value={signupinfo.name}
                />
              </div>
              <div>
                <label class="text-gray-800 text-sm mb-2 block">Email Id</label>
                <input
                  onChange={handleChange}
                  name="email"
                  type="email"
                  class="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                  placeholder="Enter email"
                  value={signupinfo.email}
                />
              </div>
              <div>
                <label class="text-gray-800 text-sm mb-2 block">
                  Contact No.
                </label>
                <input
                  onChange={handleChange}
                  name="contact"
                  type="number"
                  class="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                  placeholder="Enter Contact No."
                  value={signupinfo.contact}
                />
              </div>
              <div>
                <label class="text-gray-800 text-sm mb-2 block">Password</label>
                <input
                  onChange={handleChange}
                  name="password"
                  type="password"
                  class="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                  placeholder="Enter password"
                  value={signupinfo.password}
                />
              </div>

              <div class="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  class="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  for="remember-me"
                  class="text-gray-800 ml-3 block text-sm"
                >
                  I accept the{" "}
                  <a
                    href="javascript:void(0);"
                    class="text-blue-600 font-semibold hover:underline ml-1"
                  >
                    Terms and Conditions
                  </a>
                </label>
              </div>
            </div>

            <div class="!mt-12">
              <button
                type="submit"
                class="w-full py-3 px-4 text-sm tracking-wider font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
              >
                Create an account
              </button>
            </div>
            <p class="text-gray-800 text-sm mt-6 text-center">
              Already have an account?{" "}
              <a
                href="javascript:void(0);"
                class="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold"
              >
                <Link to="/login">Login here</Link>
              </a>
            </p>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Signup;
