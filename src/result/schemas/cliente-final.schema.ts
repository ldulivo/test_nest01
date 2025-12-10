import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'clientes_finales' })
export class ClienteFinal {
  @Prop({ required: true, index: true })
  userId: number;

  @Prop({ required: true })
  snapshotAt: Date;

  // Guardamos el objeto externo. Puedes tiparlo más fino si quieres.
  @Prop({ type: Object, required: true })
  objectExternal: any;
}

export type ClienteFinalDocument = ClienteFinal & Document;

export const ClienteFinalSchema = SchemaFactory.createForClass(ClienteFinal);
