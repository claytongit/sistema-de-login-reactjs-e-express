import React from 'react';

import LogOut from '../../LogOut';

import './style.css';

export default function Project(){
    return (
        <div className="container-project">

            <h1>Você logou</h1>

            <a href="/" onClick={ LogOut }>Sair</a>
        </div>
    );
}
