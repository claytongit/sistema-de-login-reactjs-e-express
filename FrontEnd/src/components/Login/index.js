import React, { useState } from 'react';

import api from '../../services/api';

import './style.css';

export default function Login({ history }){
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    async function log(event){
        event.preventDefault();

        const response = await api.post('/auth', { email, password }); 

        const token = response.data.token;

        localStorage.setItem('token', token);

        history.push('/project');    
        
    }

    return(
        <div className="container">
            <form onSubmit={ log }>
                <input
                    type="email"
                    placeholder="Informe seu email"
                    value={ email }
                    onChange={ event => setEmail(event.target.value) }
                />

                <input 
                    type="password"
                    placeholder="Informe sua senha"
                    value={ password }
                    onChange={ event => setPassword(event.target.value) }
                />

                <button type="submit" >Login</button>
                <a href="/register">Register</a>
            </form>
        </div>
    );
}
