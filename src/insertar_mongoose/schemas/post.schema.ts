import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'datos_externos' })
export class Post {
  @Prop({ required: true })
  userId: number;

  @Prop({ required: true })
  id: number;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  body: string;
}

export type PostDocument = Post & Document;

export const PostSchema = SchemaFactory.createForClass(Post);
