import { Status } from "../enum/status"
import { Categoria } from "./categoria.interface"
import { Usuario } from "./usuario.interface"

export interface Tarefa {
    title: string,
    descricao: string,
    data_criacao: Date,
    data_conclusao: Date,
    tipo: string,
    categoria: Categoria,
    status: Status,
    usuarioAssociado: Usuario
}