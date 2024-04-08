import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import './style/NotePage.css';
import {BackButton} from "../components/BackButton";
import Cookies from 'js-cookie';

export const NotePage = () => {

    let {id} = useParams();

    const [note, setNote] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        getNote();
    }, []);

    let getNote = async () => {
        let response = fetch(`/note/${id}`);
        let data = (await response).json();
        setNote(await data);
    }

    let updateNote = async () => {
        const csrftokenValue = Cookies.get('csrftoken');
        await fetch(
            `/note/${id}/update/`,
            {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftokenValue,
                },
                mode: 'same-origin',
                body: JSON.stringify(note),
            }
        );
    }

    let deleteNote = async () => {
        const csrftokenValue = Cookies.get('csrftoken');
        await fetch(
            `/note/${id}/delete/`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftokenValue,
                },
                mode: 'same-origin',
            }
        );

        navigate('/');
    }
    
    return (
        <div className={"note-page"}>
            <BackButton onBackPressed={() => updateNote()}/>
            <button onClick={() => deleteNote()}>Delete</button>
            <div>
                <h1 className={"note-title"}>
                    Note {id}
                </h1>
            </div>

            <textarea onChange={
                (e) => {
                    setNote({...note, 'body': e.target.value})
                }
            }
                      defaultValue={note?.body}>
            </textarea>
        </div>
    )
}