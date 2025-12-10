import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  DatosExternos,
  DatosExternosDocument,
} from './schemas/datos-externos.schema';
import {
  ClienteFinal,
  ClienteFinalDocument,
} from './schemas/cliente-final.schema';
import {
  ClientesRaw,
  ClientesRawDocument,
} from 'src/clientes-raw-mongo/schemas/clientes_raw';

@Injectable()
export class ResultService {
  constructor(
    @InjectModel(DatosExternos.name)
    private readonly datosExternosModel: Model<DatosExternosDocument>,

    @InjectModel(ClienteFinal.name)
    private readonly clienteFinalModel: Model<ClienteFinalDocument>,

    @InjectModel(ClientesRaw.name)
    private readonly clientesRawModel: Model<ClientesRawDocument>,
  ) {}

  /**
   * Lee de datos_externos los registros cuyo userId exista en clientes_raw
   * y guarda un snapshot agrupado por userId en clientes_finales.
   */
  async generarResultados() {
    // 1. Obtener userIds que existen en clientes_raw
    const userIds: number[] = await this.clientesRawModel
      .distinct('userId')
      .exec();

    if (!userIds.length) {
      return { message: 'No hay userId en clientes_raw', processed: 0 };
    }

    // 2. Obtener documentos de datos_externos cuyo userId esté en esa lista
    const externos = await this.datosExternosModel
      .find({ userId: { $in: userIds } })
      .lean()
      .exec();

    // 3. Agrupar por userId
    const grouped = new Map<number, any[]>();

    for (const doc of externos) {
      const list = grouped.get(doc.userId) ?? [];
      list.push(doc);
      grouped.set(doc.userId, list);
    }

    const now = new Date();

    // 4. Construir operaciones bulkWrite para clientes_finales
    const ops = Array.from(grouped.entries()).map(([userId, docs]) => ({
      updateOne: {
        filter: { userId }, // un documento por userId
        update: {
          $set: {
            userId,
            snapshotAt: now,
            objectExternal: docs, // aquí va el array de datos_externos del userId
          },
        },
        upsert: true,
      },
    }));

    if (!ops.length) {
      return {
        message: 'No hay datos_externos para esos userId',
        processed: 0,
      };
    }

    const result = await this.clienteFinalModel.bulkWrite(ops);

    return {
      processedUserIds: ops.length,
      matched: result.matchedCount,
      modified: result.modifiedCount,
      upserted: result.upsertedCount,
    };
  }
}
