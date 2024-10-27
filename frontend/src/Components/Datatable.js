import React, { useEffect, useState } from "react";
import { handleError, handleSuccess } from "../utils";

function Datatable() {
  const [allresult, setAllresult] = useState("");

  //fetch all the member record
  const fetchRecord = async () => {
    try {
      const url = "https://auth-project-api.vercel.app/auth";
      //this is function to gat a token from localstorage
      const headers = {
        headers: {
          Authorization: localStorage.getItem("loggedToken"),
        },
      };
      const response = await fetch(url);
      const result = await response.json();
      console.log(result);
      setAllresult(result.response);
    } catch (err) {
      handleError(err);
    }
  };
  useEffect(() => {
    fetchRecord();
  }, []);

  return (
    <div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 rounded-s-lg">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Emai
              </th>
              <th scope="col" className="px-6 py-3 rounded-e-lg">
                Update
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(allresult) &&
              allresult.map((data, index) => (
                <tr className="bg-white dark:bg-gray-800" key={index}>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {data.name}
                  </th>
                  <td className="px-6 py-4">{data.email}</td>
                  <button
                    type="button"
                    className="text-white bg-green-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-small rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Edit
                  </button>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Datatable;
