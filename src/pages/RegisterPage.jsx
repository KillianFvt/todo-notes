import {useState} from "react";
import { validate } from 'react-email-validator';
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import './style/RegisterPage.css';

export const RegisterPage = () => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [Error, setError] = useState("")

    const navigate = useNavigate();

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handleUsername = (e) => {
        setUsername(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (username === "") {
            setError("You must enter a username");
        } else if (email === "" || !validate(email)) {
            setError("Email empty or invalid");
        } else if (password.length < 6) {
            setError("Password must be at least 6 characters");
        } else {
            const csrftokenValue = Cookies.get('csrftoken');
            let response = await fetch(
                `/account/register/`,
                {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrftokenValue,
                    },
                    body: JSON.stringify({
                        'email': email,
                        'username': username,
                        'password': password,
                    }),
                }
            );

            let data = await response.json()

            if (await data.error !== undefined) {
                setError(data.error)
            } else {
                navigate('/');
            }
        }
    }
    
    return (
        <div className={"register-page"}>
            <form onSubmit={handleSubmit}>

                <h2>Register</h2>

                <p id={"error"}>{Error}</p>

                <label htmlFor={"username"}>Username
                <input onChange={handleUsername} type="text" name={"username"}/>
                </label>

                <label htmlFor={"email"}>Email
                <input onChange={handleEmail} type="email" name={"email"}/>
                </label>

                <label htmlFor={"password"}>Password
                <input onChange={handlePassword} type="password" name={"password"}/>
                </label>


                <input type="submit" value={"Register"}/>

            </form>
        </div>
    )
}