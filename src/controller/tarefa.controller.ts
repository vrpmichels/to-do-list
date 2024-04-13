import { Request, Response } from 'express'
import { TarefaService } from '../service/tarefa.service'

class TarefaController {

    async create(req: Request, res: Response) {
        const tarefa = await new TarefaService().create(req.body)
        return res.json(tarefa)
    }

    async findById(req: Request, res: Response) {
        const tarefa = await new TarefaService().findById(req.params.id)
        return res.json(tarefa)
    }

    async findAllByUsuario(req: Request, res: Response) {
        const tarefas = await new TarefaService().findAllByUsuario(req.params.usuarioId)
        return res.json(tarefas)
    }

    async updateTarefa (req: Request, res:Response){
        const tarefa = await new TarefaService().updateTarefa(req.params.id)
        return res.json(tarefa)        
    }


}

export default new TarefaController()