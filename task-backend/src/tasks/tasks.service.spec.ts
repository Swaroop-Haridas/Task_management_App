import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { getModelToken } from '@nestjs/mongoose';
import { Task } from './schemas/task.schema';

describe('TasksService', () => {
  let service: TasksService;

  beforeEach(async () => {
    const mockTaskModel = {
      create: jest.fn().mockResolvedValue({
        _id: 'mockId',
        title: 'Test Task',
        description: 'Test Desc',
        status: 'pending',
      }),
      find: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue([{ _id: 'mockId', title: 'Task 1' }]),
      }),
      findById: jest.fn().mockResolvedValue(null),
      findByIdAndUpdate: jest.fn().mockResolvedValue(null),
      findByIdAndDelete: jest.fn().mockResolvedValue(null),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getModelToken(Task.name),
          useValue: mockTaskModel,
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a task', async () => {
    const taskData = { title: 'Test Task', description: 'Test Desc' };
    const result = await service.createTask(
      taskData.title,
      taskData.description,
    );
    expect(result).toEqual({
      _id: 'mockId',
      title: 'Test Task',
      description: 'Test Desc',
      status: 'pending',
    });
  });

  it('should return all tasks', async () => {
    const result = await service.getTasks();
    expect(result).toEqual([{ _id: 'mockId', title: 'Task 1' }]);
  });
});
