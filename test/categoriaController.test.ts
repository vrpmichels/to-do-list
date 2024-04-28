import { describe, it, afterAll } from '@jest/globals';
import mongoose from 'mongoose';
import * as request from 'supertest';
import app from '../app';
import CategoriaModel from '../src/schemas/categoria.schema';


describe('testando os endpoints de categoria', () => {

    afterAll(async () => {
        await mongoose.connection.close()
    });
    afterEach(async () => {
        const collections = Object.keys(mongoose.connection.collections);
        for (const collectionName of collections) {
            const collection = mongoose.connection.collections[collectionName];
            await collection.deleteMany({}); 
        }
    })

    it.skip('Deve inserir uma categoria no banco', async () => {
        const categoriaMock = {
            nome: 'Faculdade',
            cor: 'Azul'
        };

        const response = await request.default(app).post('/api/categoria/').send(categoriaMock);
        const findedCategoria = await CategoriaModel.findById(response.body._id)

        expect(response.status).toEqual(201);
        expect(response.body._id).toBeDefined();
        expect(categoriaMock.nome).toEqual(findedCategoria?.nome);
        expect(categoriaMock.cor).toEqual(findedCategoria?.cor);
    });

    it('Deve listar todas categorias de um usuário', async () => {
        const usuarioMock = {
            nome: 'Vinicius',
            email: 'teste@email.com',
            senha: '#123',
            peso: 80.00,
        }
        const responseUsuario = await request.default(app).post('/api/usuario/').send(usuarioMock);

        const categoriaAssociadaMock = {
            nome: 'Trabalho',
            cor: 'Amarelo',
            usuarioAssociado: responseUsuario.body._id
        }
        const categoria = {
            nome: 'lazer',
            cor: 'verde'
        }
        await request.default(app).post('/api/categoria/').send(categoria);
        await request.default(app).post('/api/categoria/').send(categoriaAssociadaMock);
        const getCategoriaAssociada = await request.default(app).get(`/api/categoria/usuario/${responseUsuario.body._id}`)

        console.log(getCategoriaAssociada)

        expect(getCategoriaAssociada.status).toEqual(200);
        expect(getCategoriaAssociada.body).toHaveLength(1);
        expect(getCategoriaAssociada.body[0].nome).toEqual('Trabalho');
        expect(getCategoriaAssociada.body[0].cor).toEqual('Amarelo');
    })
});