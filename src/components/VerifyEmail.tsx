import { Verify } from "crypto";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

interface postState {
    id: number,
    userId: number,
    title: string;
    body: string;
  }
  
const VerifyEmail = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [token, setToken] = useState("");
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');


    useEffect(() => {
      const url = process.env.REACT_APP_API_ACTIVE+`api/v1/users/activation/${params.token}`;
      fetch(url)
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        if (res["response"] == 'email verified') {
          setSuccessMessage(res["response"]);
          setTimeout(redirectLogIn, 3000);
        }
        else {          
          setErrorMessage(res["response"]);
        }

        function redirectLogIn() {
          document.location.href = '../login';
       }

        

        })
    }, []);
   
    
  
    return (

      <>


      <style>{
                          'body { background-image: url("../background-log-in-002.jpg"); background-position: center;background-repeat: no-repeat;background-size: cover;backdrop-filter: blur(16px); }'
                      }</style>
                      
                  
      
      <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl text-4xl">
          <p className="error text-rose-600"> {errorMessage} </p>
          <p className="error text-lime-600"> {successMessage} </p>
      </div>
      </div>
      
          </>
        

    )
};

export default VerifyEmail;

