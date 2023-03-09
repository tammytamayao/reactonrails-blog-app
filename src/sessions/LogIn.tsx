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
    
        const onChange = (user: React.ChangeEvent<HTMLInputElement>, setFunction: { (value: React.SetStateAction<string>): void; (value: React.SetStateAction<string>): void;}) => {
            console.log("This is handleInputChange function");
            setFunction(user.target.value);
        }
    
        const onSubmit = (user: React.FormEvent<HTMLFormElement>) => {
            /*user.preventDefault();
            console.log(email,password,confirmPassword);*/
    
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
                //alert("New User Added"); 
    
                alert(res["response"]); 
            })
            //.then(() => navigate("/posts"))
    
        }
    
      return (
        <>
        <h1>Log In</h1>
            <form onSubmit={onSubmit}>
                <div>
                    <div className="email">
                        <label className="form__label">Email </label>
                        <input  type="email" id="email" className="form__input" value={email} onChange = {(e) => onChange(e, setEmail)} placeholder="Email"/>
                    </div>   
                    <div className="password">
                        <label className="form__label">Password </label>
                        <input className="form__input" type="password"  id="password" value={password} onChange = {(e) => onChange(e, setPassword)} placeholder="Password"/>
                    </div>
                </div>
                <div>
                <button type="submit">Log In</button><br/>
                Not yet a user? <Link to="/"> Sign up here. </Link>
                </div>
            </form>
        </>
      )
}

export default LogIn

