import React, {useState, useEffect} from "react";
import {NoteListItem} from "../components/NoteListItem";
import './style/NoteListPage.css';
import {AddNoteButton} from "../components/AddNoteButton";

export const NoteListPage = () => {

    let [notes, setNotes] = useState([])

    useEffect(() => {
        getNotes();
    }, []);

    let getNotes = async () => {
        let response = await fetch('api/notes/');
        let data = response.json();
        setNotes(await data);
    }

    return (
        <div className={"notes-container"}>
            <AddNoteButton/>
            <div className={'notes-list'}>
                {
                    notes.map((note, index) => (
                        <NoteListItem key={index} note={note}/>
                    ))
                }
            </div>
        </div>
    )
}