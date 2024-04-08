import {useNavigate} from "react-router-dom";
import './style/LogoutPage.css';


export const LogoutPage = () => {

    let navigate = useNavigate();

    const handleLogout = async (e) => {
        await fetch("/account/logout/");
        navigate('/')
    }

    const handleCancel = (e) => {
        navigate(-1);
    }


    return (
        <main className={"logout-page"}>
            <div>
                <h3>Are you sure you want to logout ?</h3>
                <div id={'logout-btns'}>
                    <button onClick={handleCancel}>Cancel</button>
                    <button onClick={handleLogout}>Log out</button>
                </div>
            </div>
        </main>
    )
}