import React, { useState } from 'react';

import api from '../../services/api';

import './style.css';

export default function Register({ history }){

    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    

    async function register(event){
        event.preventDefault();

        const response = await api.post('/register', { name, email, password });

        const token = response.data.token;

        localStorage.setItem('token', token);

        history.push('/project');

    }

    return(
        <div className="container">
            <form onSubmit={ register }>

                <input 
                    type="text"
                    placeholder="Informe seu nome"
                    value={ name }
                    onChange={ event => setName(event.target.value) }
                />

                <input 
                    type="email"
                    placeholder="Informe seu melhor email"
                    value={ email }
                    onChange={ event => setEmail(event.target.value) }
                />

                <input
                    type="password"
                    placeholder="Informe sua senha"
                    value={ password }
                    onChange={ event => setPassword(event.target.value) }
                />

                <button type="submit">Registrar</button>

                <a href="/" >Voltar</a>

            </form>
        </div>
    );
}

