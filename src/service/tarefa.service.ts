import TarefaModel from '../schemas/tarefa.schema'

export class TarefaService {

    async create(usuario: any) {
        const createdUsuario = await TarefaModel.create(usuario);

        return createdUsuario;
    }

    async findById(id: any) {
        const findedUsuario = await TarefaModel.findById(id);
        return findedUsuario;
    }

    async findAllByUsuario(usuarioId:any){

        const tarefas = await TarefaModel.find({ usuarioAssociado: usuarioId });

        return tarefas;
    }

    async updateTarefa(tarefaId:any){
        const tarefa = await TarefaModel.updateOne(tarefaId)
    }
}