import React, { useState, useEffect} from "react";
import { Link } from "react-router-dom";
import {baseURL, client} from "../config/AxiosConfig";

const UserHome = () => {

  var user_email = sessionStorage.getItem("user_email");
  var user_id = sessionStorage.getItem("user_id");
  var user_created = sessionStorage.getItem("user_created");
  var first_name = sessionStorage.getItem("first_name");
  var middle_name = sessionStorage.getItem("middle_name");
  var last_name = sessionStorage.getItem("last_name");


  const getActiveSession = async () => {
    const response: any = await client.get(baseURL+`/users/getsessionid`);
    if(response.status===200) {
      const res= response.data;
      if (res["session_id"] == user_id) {
        alert("Valid Session");
      }
      else {
        alert("Session invalid - " + res["session_id"]);
      }
    } 
  }

  useEffect(() => {
    getActiveSession();
  }, []);


  return (
    <>
        <h1>Welcome</h1>
        <hr/>
        <div> User ID: { user_id } </div>
        <div> Email: { user_email } </div>
        <div> Name: { first_name + " " + middle_name + " " + last_name} </div>
        <div> Created: { user_created } </div>
    </>
  );
};

export default UserHome;


