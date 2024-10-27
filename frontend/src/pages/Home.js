import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";
import Nav from "./../Components/Navbar";
import Datatable from "../Components/Datatable";

function Home() {
  
  const [allresult, setAllresult] = useState("");
  

  //fetch all the member record
  const fetchRecord = async () => {
    try {
      const url = "http://localhost:8000/auth";
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
    <>
      <Nav/>
      <div className="m-20"> 
        <Datatable />
      </div>
    </>
  );
}

export default Home;
