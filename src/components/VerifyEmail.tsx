import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

interface postState {
    id: number,
    userId: number,
    title: string;
    body: string;
  }
  
const EditPost = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [token, setToken] = useState("");


    useEffect(() => {
      const url = process.env.REACT_APP_API_ACTIVE+`api/v1/users/activation/${params.token}`;
      fetch(url)
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        //alert(res["response"]); 
        document.write('<h1>'+res["response"]+'</h>')


        

        })
    }, []);
   
    
  
    return (
        <div>
        </div>
    )
};

export default EditPost;


