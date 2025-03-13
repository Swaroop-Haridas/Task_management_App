import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { getModelToken } from '@nestjs/mongoose';
import { Task } from './schemas/task.schema';

describe('TasksController', () => {
  let controller: TasksController;
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        TasksService,
        {
          provide: getModelToken(Task.name),
          useValue: {
            create: jest.fn(),
            find: jest.fn(),
            findById: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findByIdAndDelete: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a task', async () => {
    const taskData = { title: 'New Task', description: 'Test Desc' };
    jest.spyOn(service, 'createTask').mockResolvedValue(taskData as Task);

    const result = await controller.createTask(
      taskData.title,
      taskData.description,
    );
    expect(result).toEqual(taskData);
  });

  it('should get all tasks', async () => {
    const tasks = [{ title: 'Task 1' }, { title: 'Task 2' }];
    jest.spyOn(service, 'getTasks').mockResolvedValue(tasks as Task[]);

    const result = await controller.getTasks();
    expect(result).toEqual(tasks);
  });

  it('should get a single task by ID', async () => {
    const task = { title: 'Task 1' };
    jest.spyOn(service, 'getTaskById').mockResolvedValue(task as Task);

    const result = await controller.getTaskById('123');
    expect(result).toEqual(task);
  });

  it('should update a task', async () => {
    const task = { title: 'Task 1', status: 'completed' };
    jest.spyOn(service, 'updateTask').mockResolvedValue(task as Task);

    const result = await controller.updateTask('123', { status: 'completed' });
    expect(result).toEqual(task);
  });

  it('should delete a task', async () => {
    jest.spyOn(service, 'deleteTask').mockResolvedValue();

    const result = await controller.deleteTask('123');
    expect(result).toEqual({ message: 'Task deleted successfully' });
  });
});
