import React from "react";
import { useNavigate } from "react-router-dom";


export const BackButton = ({onBackPressed}) => {

    const navigate = useNavigate();

    return (
        <div>
            <button onClick={() => {
                navigate(-1);
                onBackPressed();
            }}>Back</button>
        </div>
    )
}