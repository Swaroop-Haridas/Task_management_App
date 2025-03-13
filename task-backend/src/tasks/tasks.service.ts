import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './schemas/task.schema';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<TaskDocument>,
  ) {}

  async createTask(title: string, description: string): Promise<Task> {
    const newTask = new this.taskModel({ title, description });
    return newTask.save();
  }

  async getTasks(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }

  async getTaskById(id: string): Promise<Task> {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      throw new BadRequestException('Invalid task ID format');
    }
    const task = await this.taskModel.findById(id);
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  async updateTask(
    id: string,
    updateData: { title?: string; description?: string; status?: string },
  ): Promise<Task> {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      throw new BadRequestException('Invalid task ID format');
    }
    const updatedTask = await this.taskModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updatedTask) throw new NotFoundException('Task not found');
    return updatedTask;
  }

  async deleteTask(id: string): Promise<void> {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      throw new BadRequestException('Invalid task ID format');
    }
    const result = await this.taskModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException('Task not found');
  }
}
