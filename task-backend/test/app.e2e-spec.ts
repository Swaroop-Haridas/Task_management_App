import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { getModelToken } from '@nestjs/mongoose';
import { Task } from '../src/tasks/schemas/task.schema';
import { Connection } from 'mongoose';

describe('Task API (e2e)', () => {
  let app: INestApplication;
  let connection: Connection;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(getModelToken(Task.name))
      .useValue({
        find: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue([
            {
              _id: '1',
              title: 'Task 1',
              status: 'pending',
              description: 'Test',
            },
          ]),
        }),
        create: jest
          .fn()
          .mockImplementation((task) => Promise.resolve({ _id: '2', ...task })),
      })
      .compile(); // FIXED: `.compile()` was wrongly placed

    app = moduleFixture.createNestApplication(); // FIXED: Properly using `moduleFixture`
    await app.init();

    connection = moduleFixture.get(getModelToken('DatabaseConnection')); // FIXED: Using `moduleFixture.get()`
  });

  afterAll(async () => {
    await connection?.close(); // FIXED: Prevent errors if connection is undefined
    await app?.close(); // FIXED: Prevent errors if app is undefined
  });

  it('/tasks (GET) should return tasks', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return request(app.getHttpServer())
      .get('/tasks')
      .expect(200)
      .expect([{ title: 'Task 1', status: 'pending' }]);
  });

  it('/tasks (POST) should create a new task', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return request(app.getHttpServer())
      .post('/tasks')
      .send({ title: 'New Task', description: 'Task description' })
      .expect(201)
      .expect({ title: 'New Task', status: 'pending' });
  });
});
