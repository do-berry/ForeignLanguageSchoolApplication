import React from "react";
import {CreateGroupForm} from "./CreateGroupForm";
import './CreateGroup.css';

export const CreateGroup = () => {
    return (
        <div id='createGroup'>
            <h1>Nowa grupa zajeciowa</h1>
            <br/>
            <CreateGroupForm/>
        </div>
    );
}