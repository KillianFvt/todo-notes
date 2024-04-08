import React from "react";
import {Link} from "react-router-dom";
import './style/NoteListItem.css';

export const NoteListItem = ({note}) => {

    let createdDate = note.created.slice(0, 10)
    let createdTime = note.created.slice(11, 16)

    return (
        <Link to={`/note/${note.id}`} style={{ textDecoration: 'none' }}>
            <div className={"list-note-container"}>
                <h3>{note.body}</h3>
                <p>{createdDate} at {createdTime}</p>
            </div>
        </Link>
    )
}
