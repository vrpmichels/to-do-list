import { describe, it, afterAll } from '@jest/globals'
import mongoose from 'mongoose'
import * as request from 'supertest'
import app from '../app';
import UsuarioModel from '../src/schemas/usuario.schema'

describe('test endpoin tarefa', () => {
    afterAll(async () => {
        await mongoose.connection.close();
    });

      
})