import { Schema, model } from "mongoose"

const categoria = new Schema({
    nome: String,
    cor: String
}, {
    timestamps: true
})

export default model('categoria', categoria)