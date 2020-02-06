const jtw = require('jsonwebtoken');
const authConfig = require('../config/auth');

//Autenticação do token
module.exports = (req, res, next) =>{
    const authHeader = req.headers.authorization;

    //Se existe token no cabeçalho da requisição
    if(!authHeader){
        return res.status(401).send({ error: 'No token provided' });
    }

    //Verifica se o token tem duas partes Bearer e token
    const parts = authHeader.split(' ');

    if(!parts.length === 2){
        return res.status(401).send({ error: 'Token error' });
    }

    const [ scheme, token ] = parts;

    //Verifica se no scheme esta excrito Bearer = /^Bearer$/
    if( !/^Bearer$/i.test(scheme) ){
        return res.status(401).send({ error: 'Token malformatted' });
    }

    jtw.verify(token, authConfig.secret, (err, decoded) =>{

        if(err){
            return res.status(401).send({ error: 'Token invalid' });
        }

        req.userId = decoded.id;
        
        return next();
    });
};