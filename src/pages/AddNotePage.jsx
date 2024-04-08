import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

export const AddNotePage = () => {
    const [body, setBody] = useState("");
    const navigate = useNavigate();

    let handleInputChange = (e) => {
        setBody(e.target.value);
    }

    let handleSubmit = async (e) => {
        e.preventDefault();
        const csrftokenValue = Cookies.get('csrftoken');
        await fetch(
            `/note/add/`,
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftokenValue,
                },
                mode: 'same-origin',
                body: JSON.stringify({'body': body }),
            }
        );
        navigate('/');
    }

    return (
        <main>
            <h3>New Note</h3>
            <form onSubmit={handleSubmit}>
                <textarea onChange={handleInputChange} value={body} />
                <button type="submit">Add Note</button>
            </form>
        </main>
    )
}