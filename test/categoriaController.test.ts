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

    it('Deve inserir uma categoria no banco', async () => {
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

        expect(getCategoriaAssociada.status).toEqual(200);
        expect(getCategoriaAssociada.body).toHaveLength(1);
        expect(getCategoriaAssociada.body[0].nome).toEqual('Trabalho');
        expect(getCategoriaAssociada.body[0].cor).toEqual('Amarelo');
    });

    it('deve listar uma categoria específica', async () => {
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
        const categoriaMock = {
            nome: 'lazer',
            cor: 'verde'
        }
        const responseCategoria = await request.default(app).post('/api/categoria/').send(categoriaMock);
        await request.default(app).post('/api/categoria/').send(categoriaAssociadaMock);
        const getCategoria = await request.default(app).get(`/api/categoria/${responseCategoria.body._id}`);

        expect(getCategoria.status).toEqual(200);
        expect(getCategoria.body.nome).toEqual('lazer');
        expect(getCategoria.body.cor).toEqual('verde')
    })

    it('Deve atualizar uma categoria específica', async () => {
        const categoriaMock = {
            nome: 'lazer',
            cor: 'verde'
        }
        const postCategoria = await request.default(app).post('/api/categoria/').send(categoriaMock);

        const atualizado = {
            nome: 'Testando o patch',
            cor: 'Vermelho'
        }

        const responseCategoria = await request.default(app).patch(`/api/categoria/${postCategoria.body._id}`).send(atualizado);
        expect(responseCategoria.status).toEqual(200);
    })

});