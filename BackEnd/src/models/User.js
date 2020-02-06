const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true, //email unico
        required: true, 
        lowercase: true, //caixa baixa
    },
    password: {
        type: String,
        required: true, 
        select: false, //Não mostrar senha na hora da busca de usuario
    },
    createdAt: { //criar data e hora que os dados foram criados 
        type: Date,
        default: Date.now,
    },
});

//Criptografar a senha
UserSchema.pre('save', async function(next){
    
    const hash = await bcryptjs.hash(this.password, 10 ); //quantas vezes o hash é gerado
    this.password = hash;

    next();
});

module.exports = mongoose.model('User', UserSchema);