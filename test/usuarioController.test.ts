import { describe, it, afterAll } from '@jest/globals'
import mongoose from 'mongoose'
import * as request from 'supertest'
import app from '../app';
import UsuarioModel from '../src/schemas/usuario.schema'


describe('testando os endpoints de usuario', () => {

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

    it('Deve inserir um usuário no banco', async () => {
        const usuarioMock = {
            nome: 'julio',
            peso: 66.0,
            senha: '@123',
            email: 'teste@gmail.com'
        };

        const response = await request.default(app).post('/api/usuario/').send(usuarioMock);
        const findedUsuario = await UsuarioModel.findById(response.body._id)

        expect(response.status).toEqual(201);
        expect(response.body._id).toBeDefined();
        expect(usuarioMock.nome).toEqual(findedUsuario?.nome);
        expect(usuarioMock.email).toEqual(findedUsuario?.email);
        expect(usuarioMock.peso).toEqual(findedUsuario?.peso);
        expect(usuarioMock.senha).toEqual(findedUsuario?.senha);
    })
});