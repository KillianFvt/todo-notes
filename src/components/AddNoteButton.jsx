import {useNavigate} from "react-router-dom";

export const AddNoteButton = () => {

    let navigate = useNavigate();

    return (
        <button onClick={() => {navigate("/note/add/")}}>New note</button>
    )
}