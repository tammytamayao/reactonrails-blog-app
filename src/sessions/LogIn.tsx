import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface userState {
    email: string,
    password: string,
  }

const LogIn = () => {
    
        const [email, setEmail] = useState("");
        const [password,setPassword] = useState("");
        const [user, setUser] = useState<userState>({
            email: "",
            password: ""
          });
        const [errorMessage, setErrorMessage] = useState('');
    
        const onChange = (user: React.ChangeEvent<HTMLInputElement>, setFunction: { (value: React.SetStateAction<string>): void; (value: React.SetStateAction<string>): void;}) => {
            console.log("This is handleInputChange function");
            setFunction(user.target.value);
        }
    
        const onSubmit = (user: React.FormEvent<HTMLFormElement>) => {

            user.preventDefault();
            const url = process.env.REACT_APP_API_ACTIVE+'api/v1/users/login';
    
            fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                email: email,
                password: password
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            })
            .then((response) => response.json())
            .then((res) => {
                console.log(res);
                setUser(res);
                if (res["response"] == 'authenticated') {   
                    document.location.href = '../post';
                }
                else { 
                    setErrorMessage(res["response"]);
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
        <a
            href="#"
            className="text-xs text-black hover:underline"
        >
            Forget Password?
        </a>
        <div className="mt-6">
            <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-black rounded-md hover:bg-black focus:outline-none focus:bg-black">
                Login
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
            <Link to="/signup">Sign up</Link>
        </a>
    </p>
</div>
</div>



        </>
      )
}

export default LogIn;


