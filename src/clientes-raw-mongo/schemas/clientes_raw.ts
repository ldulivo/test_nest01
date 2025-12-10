import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'clientes_raw' })
export class ClientesRaw {
  @Prop({ required: true })
  userId: number;

  @Prop({ required: true })
  id: number;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  completed: boolean;
}

export type ClientesRawDocument = ClientesRaw & Document;

export const ClientesRawSchema = SchemaFactory.createForClass(ClientesRaw);
