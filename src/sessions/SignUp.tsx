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
    const user = useState<userState>({
        email: "",
        password: "",
        password_confirmation:""
      });

    const onChange = (user: React.ChangeEvent<HTMLInputElement>, setFunction: { (value: React.SetStateAction<string>): void; (value: React.SetStateAction<string>): void;}) => {
        console.log("This is handleInputChange function");
        setFunction(user.target.value);
    }

    const onSubmit = (user: React.FormEvent<HTMLFormElement>) => {
        user.preventDefault();
        console.log(email,password,confirmPassword);
    }

  return (
    <>
    <h1>Sign Up</h1>
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
                <div className="confirm-password">
                    <label className="form__label">Confirm Password </label>
                    <input className="form__input" type="password" id="confirmPassword" value={confirmPassword} onChange = {(e) => onChange(e, setConfirmPassword)} placeholder="Confirm Password"/>
                </div>
            </div>
            <div>
            <button type="submit">Register</button><br/>
            Already a user? <Link to="/login"> Sign in here. </Link>
            </div>
        </form>
    </>
  )
}

export default SignUp
