import React from 'react';
import './PageNotFound.css';

export const PageNotFound = () => {
    return (
        <div id='pageNotFound'>
            <h1>404</h1>
            <h2>Nie znaleziono strony.</h2>
            <br/>
            <a href='/'>Powrot do strony glownej</a>
        </div>
    );
}