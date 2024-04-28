import CategoriaModel from '../schemas/categoria.schema'
import { Categoria } from '../schemas/interfaces/categoria.interface';

export class CategoriaService {

    async create(categoria: Categoria) {
        const createdCategoria = await CategoriaModel.create(categoria);

        return createdCategoria;
    }

    async findById(id: any) {
        const findedCategoria = await CategoriaModel.findById(id);
        return findedCategoria;
    }

    async findAllByUsuario(usuarioId:any){

        const categorias = await CategoriaModel.find({ usuarioAssociado: usuarioId });

        return categorias;
    }

    async updateCategoria(categoriaId:any, updateCategoria:Categoria){
        const categoria = await CategoriaModel.updateOne(categoriaId,updateCategoria)
        return categoria
    }

    async deleteCategoria(categoriaId: any){
        const categoria = await CategoriaModel.deleteOne(categoriaId)

        return categoria;
    }


}