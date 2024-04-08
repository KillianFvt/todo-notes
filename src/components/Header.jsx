import "./style/Header.css";
import {useState, useEffect} from "react";
import { useLocation } from "react-router-dom";


export const Header = () => {
    const [user, setUser] = useState(null);

    const location = useLocation();

    useEffect(() => {
    const fetchUser = async () => {
        let response = await fetch(
            '/account/get-current-user/'
        );
        let data = await response.json();
        console.log(data)
        setUser(data);
    };

    fetchUser();
    }, [location]);

    return (
        <header>
            <h2 className={"headerTitle"}>Notes app</h2>
            {user && !user.error ? <div>Welcome, {user.username}</div> : <div>Not logged in</div>}
        </header>
    )
}