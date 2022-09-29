import React from "react";
import './Header.css'

export default ({black}) => {
    return (
        <header className={black ? 'black' : ''}>
            <div className="header--logo">
                <a href="/">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="netflix"/>
                </a>
            </div>
            <div className="header--user">
                <a href="/">
                    <img src="https://help.nflxext.com/d89db174-27fd-4d00-8baf-708a361f9312_ST_1984_AppIcon_en.png" alt="Usuario"/>
                </a>
            </div>
        </header>
    )
}