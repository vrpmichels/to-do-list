import { Router } from 'express'
import usuarioController from './src/controller/usuario.controller'
import tarefaController from './src/controller/tarefa.controller'
import categoriaController from './src/controller/categoria.controller'

const routes = Router()

routes.post('/usuario', usuarioController.create);
routes.get('/usuario/:id', usuarioController.findById);

routes.post('/tarefa', tarefaController.create);
routes.get('/tarefa/usuario/:usuarioId', tarefaController.findAllByUsuario);
routes.get('/tarefa/data', tarefaController.findAllByDataRange)
routes.get('/tarefa/:id', tarefaController.findById);
routes.patch('/tarefa/:id', tarefaController.updateTarefa);
routes.delete('/tarefa/:id', tarefaController.deleteTarefa);
routes.get('/tarefa/contagem/:usuarioId', tarefaController.countByUsuario);
routes.get('/tarefa/categoria/:categoriaId', tarefaController.findAllByCategoria);
routes.get('/tarefa/status/concluida', tarefaController.findAllConcluidas);
routes.get('/tarefa/status/pendente', tarefaController.findAllPendentes);
routes.get('/tarefa/recente/:usuarioId', tarefaController.recentTarefa);
routes.get('/tarefa/media', tarefaController.calcularMediaDeTarefasConcluidas);
routes.get('/tarefa/descricao/maior', tarefaController.getMaiorDescricao);
routes.get('/tarefa/categoria', tarefaController.groupByCategoria);
routes.get('/tarefa/ultima/:usuarioId', tarefaController.latestTarefa);


routes.post('/categoria', categoriaController.create);
routes.get('categoria/:usuarioId', categoriaController.findAllByUsuario);
routes.get('/categoria/:id', categoriaController.findById);
routes.patch('/categoria/:id', categoriaController.updateTarefa);
routes.delete('/categoria/:id', categoriaController.deleteTarefa);


        export {
            routes
        }