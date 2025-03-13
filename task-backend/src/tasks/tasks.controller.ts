import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './schemas/task.schema';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async createTask(
    @Body('title') title: string,
    @Body('description') description: string,
  ): Promise<Task> {
    return this.tasksService.createTask(title, description);
  }

  @Get()
  async getTasks(): Promise<Task[]> {
    return this.tasksService.getTasks();
  }

  @Get(':id')
  async getTaskById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Put(':id')
  async updateTask(
    @Param('id') id: string,
    @Body()
    updateData: { title?: string; description?: string; status?: string },
  ) {
    return this.tasksService.updateTask(id, updateData);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string): Promise<{ message: string }> {
    await this.tasksService.deleteTask(id);
    return { message: 'Task deleted successfully' };
  }
}
