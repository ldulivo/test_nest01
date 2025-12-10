import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ClienteRaw } from './interfaces/cliente-raw.interface';

@Injectable()
export class ClientesRawService {
  constructor(private readonly httpService: HttpService) {}

  async getClientes(): Promise<ClienteRaw[]> {
    const response = await this.httpService.axiosRef.get<ClienteRaw[]>(
      'https://jsonplaceholder.typicode.com/todos',
    );

    const data = response ? response.data : [];

    const filtrados = data.filter((cliente) => cliente.completed === false);

    return filtrados;
  }
}
