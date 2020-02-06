const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

module.exports ={
    async store(req, res){

        //Autenticação de email e senha do usuario
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select('+password');

        if(!user){
            return res.status(400).send({ error: 'User not found' });
        }

        if(!await bcryptjs.compare(password, user.password)){
            return res.status(400).send({ error: 'Invalid password' });
        }

        //password vai ser apagado na hora que o usuario for criado
        user.password = undefined;

        //Gerar o token
        const token = jwt.sign({ id: user.id }, authConfig.secret, { expiresIn: 86400, });

        return res.send({ user, token });

    }
}