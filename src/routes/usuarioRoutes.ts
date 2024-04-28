import { Router } from 'express';
import usuarioController from '../controller/usuario.controller';

const usuarioRoutes = Router();

usuarioRoutes.post('/', usuarioController.create);
usuarioRoutes.get('/:id', usuarioController.findById);

export default usuarioRoutes;
