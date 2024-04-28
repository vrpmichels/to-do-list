import { Schema, model } from 'mongoose'

const tarefa = new Schema({
    title: String,
    descricao: String,
    data_criacao: { type: Date, require: true },
    data_conclusao: { type: Date, require: true },
    tipo: String,
    categoria: { type: Schema.Types.ObjectId, ref: 'Categoria' },
    status: { type: String, enum: ['pendente', 'em andamento', 'concluída'] },
    usuarioAssociado: { type: Schema.Types.ObjectId, ref: 'Usuario' }
}, {
    timestamps: true
})

export default model('Tarefa', tarefa)