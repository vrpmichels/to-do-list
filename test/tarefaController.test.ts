import { describe, it, afterAll } from '@jest/globals'
import mongoose from 'mongoose'
import * as request from 'supertest'
import app from '../app';
import TarefaModel from '../src/schemas/tarefa.schema'

describe('test endpoin tarefa', () => {
    afterAll(async () => {
        await mongoose.connection.close();
    });

    afterEach(async () => {
        const collections = Object.keys(mongoose.connection.collections);
        for (const collectionName of collections) {
            const collection = mongoose.connection.collections[collectionName];
            await collection.deleteMany({});
        }
    })

    it('Deve criar nova tarefa', async () => {

        const tarefaMock = {
            title: "Tarefa 01",
            descricao: "Teste tarafe 01",
            data_criacao: new Date(),
            tipo: "Tipo da Tarefa"
        };

        const response = await request.default(app).post('/api/tarefa/').send(tarefaMock);
        const findedTarefa = await TarefaModel.findById(response.body._id)

        expect(response.body._id).toBeDefined();
        expect(tarefaMock.title).toEqual(findedTarefa?.title);
        expect(tarefaMock.descricao).toEqual(findedTarefa?.descricao);
        expect(tarefaMock.data_criacao).toEqual(findedTarefa?.data_criacao);
        expect(tarefaMock.tipo).toEqual(findedTarefa?.tipo);

    });

    it('Deve listar tarefas por usuário', async () => {

        const usuarioMock = {
            nome: 'julio',
            peso: 66.0,
            senha: '@123',
            email: 'teste@gmail.com'
        };

        const response1 = await request.default(app).post('/api/usuario/').send(usuarioMock);

        const tarefaMock01 = {
            title: "Tarefa 01",
            descricao: "Teste tarefa 01",
            data_criacao: new Date(),
            tipo: "Tipo teste 01",
            usuarioAssociado: response1.body._id
        };

        const tarefaMock02 = {
            title: "Tarefa 02",
            descricao: "Teste tarefa 02",
            data_criacao: new Date().toJSON(),
            tipo: "Tipo teste 02",
            usuarioAssociado: response1.body._id
        };

        const response2 = await request.default(app).post('/api/tarefa/').send(tarefaMock01);
        const response3 = await request.default(app).post('/api/tarefa/').send(tarefaMock02);

        const getTarefas = await request.default(app).get(`/api/tarefa/usuario/${response1.body._id}`);
        expect(getTarefas.body[0].title).toEqual(tarefaMock01.title);
        expect(getTarefas.body[1].title).toEqual(tarefaMock02.title);
        expect(getTarefas.body[0].descricao).toEqual(tarefaMock01.descricao);
        expect(getTarefas.body[1].descricao).toEqual(tarefaMock02.descricao);
    });

})