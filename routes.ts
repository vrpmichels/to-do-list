import { Router } from 'express'
import usuarioController from './src/controller/usuario.controller'
import tarefaController from './src/controller/tarefa.controller'

const routes = Router()
routes.post('/usuario', usuarioController.create)
routes.get('/usuario/:id', usuarioController.findById)

routes.post('/tarefa',tarefaController.create)
routes.get('/tarefa/:usuarioId',tarefaController.findAllByUsuario)

export {
    routes
}