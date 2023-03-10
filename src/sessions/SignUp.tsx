import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface userState {
    email: string,
    password: string,
    password_confirmation: string;
  }
  

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const navigate = useNavigate();
    const [user, setUser] = useState<userState>({
        email: "",
        password: "",
        password_confirmation:""
      });
      
    const [errorMessage, setErrorMessage] = useState('');
    

    const onChange = (user: React.ChangeEvent<HTMLInputElement>, setFunction: { (value: React.SetStateAction<string>): void; (value: React.SetStateAction<string>): void;}) => {
        console.log("This is handleInputChange function");
        setFunction(user.target.value);
    }

    const onSubmit = (user: React.FormEvent<HTMLFormElement>) => {
        user.preventDefault();
        const url = process.env.REACT_APP_API_ACTIVE+'api/v1/users/register';

        fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            email: email,
            password: password,
            password_confirmation:confirmPassword
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        })
        .then((response) => response.json())
        .then((res) => {
            console.log(res);
            setUser(res);
            setErrorMessage(res["response"]);

            if (res["response"] == "registration successful") {
                navigate("/login")
            }
        })

    }

  return (
    <>


<style>{
                    'body { background-image: url("background-log-in-002.jpg"); background-position: center;background-repeat: no-repeat;background-size: cover;backdrop-filter: blur(16px); }'
                }</style>
                
            

<div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
<div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
    <img src="logo_typekita.png"/>

    <p className="error text-rose-600"> {errorMessage} </p>

    <form className="mt-6" onSubmit={onSubmit}>
        <div className="mb-2">
            <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-800"
            >
                Email
            </label>
            <input
                type="email"
                className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-black-400 focus:ring-black-300 focus:outline-none focus:ring focus:ring-opacity-40"
                id="email" value={email} onChange = {(e) => onChange(e, setEmail)} placeholder="Email"
            />
        </div>
        <div className="mb-2">
            <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-800"
            >
                Password
            </label>
            <input
                type="password"
                className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-black-400 focus:ring-black-300 focus:outline-none focus:ring focus:ring-opacity-40"
                id="password" value={password} onChange = {(e) => onChange(e, setPassword)} placeholder="Password"
            />
        </div>
        
        <div className="mb-2">
            <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-800"
            >
                Confirm Password
            </label>
            <input
                type="password"
                className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-black-400 focus:ring-black-300 focus:outline-none focus:ring focus:ring-opacity-40"
                id="confirmPassword" value={confirmPassword} onChange = {(e) => onChange(e, setConfirmPassword)} placeholder="Confirm Password"
            />
        </div>
        <div className="mt-6">
            <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-black rounded-md hover:bg-black focus:outline-none focus:bg-black">
                Sign Up
            </button>
        </div>
    </form>

    <p className="mt-8 text-xs font-light text-center text-gray-700">
        {" "}
        Don't have an account?{" "}
        <a
            href="#"
            className="font-medium text-black hover:underline"
        >
            <Link to="/login">Log In</Link>
        </a>
    </p>
</div>
</div>

    </>
  )
}

export default SignUp;
