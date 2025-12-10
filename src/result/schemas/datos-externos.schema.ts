import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'datos_externos' })
export class DatosExternos {
  @Prop({ required: true })
  userId: number;

  @Prop({ required: true })
  id: number;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  body: string;
}

export type DatosExternosDocument = DatosExternos & Document;

export const DatosExternosSchema = SchemaFactory.createForClass(DatosExternos);
