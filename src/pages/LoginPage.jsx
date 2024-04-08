import {useState} from "react";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import './style/RegisterAndLoginPage.css';

export const LoginPage = () => {

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

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (email === "") {
			setError("You must enter a email");
		} else if (password.length < 6) {
			setError("Password must be at least 6 characters");
		} else {
			const csrftokenValue = Cookies.get('csrftoken');
			let response = await fetch(
				`/account/login/`,
				{
					method: "POST",
					headers: {
						'Content-Type': 'application/json',
						'X-CSRFToken': csrftokenValue,
					},
					body: JSON.stringify({
						'email': email,
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
		<div className={"login-page"}>
			<form onSubmit={handleSubmit}>

				<h2>Login</h2>

				<p id={"error"}>{Error}</p>

				<label htmlFor={"email"}>Email
					<input onChange={handleEmail} type="text" name={"email"}/>
				</label>

				<label htmlFor={"password"}>Password
					<input onChange={handlePassword} type="password" name={"password"}/>
				</label>

				<input type="submit" value={"Login"}/>

			</form>
		</div>
	)
}