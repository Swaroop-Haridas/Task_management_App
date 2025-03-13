import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema()
export class Task {
  @Prop({ type: String, required: true })
  title!: string;

  @Prop({ type: String, required: true })
  description!: string;

  @Prop({
    type: String,
    enum: ['pending', 'in-progress', 'completed'],
    default: 'pending',
  })
  status!: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
