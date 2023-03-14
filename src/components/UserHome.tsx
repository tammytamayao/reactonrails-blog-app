import React, { useState, useEffect} from "react";
import { Link } from "react-router-dom";
import {baseURL, client} from "../config/AxiosConfig";

const UserHome = () => {

    var user_email = sessionStorage.getItem("user_email");
    var user_id = sessionStorage.getItem("user_id");
    var user_created = sessionStorage.getItem("user_created");
 

  return (
    <>
        <h1>Welcome</h1>
        <hr/>
        <div> Email: { user_email } </div>
        <div> User ID: { user_id } </div>
        <div> Created: { user_created } </div>
    </>
  );
};

export default UserHome;


