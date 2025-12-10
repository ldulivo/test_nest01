import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from './schemas/post.schema';

interface PostFromApi {
  userId: number;
  id: number;
  title: string;
  body: string;
}

@Injectable()
export class InsertarMongooseService {
  constructor(
    private readonly httpService: HttpService,
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
  ) {}

  async getPosts(): Promise<any[]> {
    const response = await this.httpService.axiosRef.get<any[]>(
      'https://jsonplaceholder.typicode.com/posts',
    );

    const data = response ? response.data : [];

    // borro datos anteriores
    await this.postModel.deleteMany({}).exec();

    // inserto los nuevos datos
    // await this.postModel.insertMany(data);
    await this.postModel.bulkWrite(
      data.map((post: PostFromApi) => ({
        insertOne: {
          document: post,
        },
      })),
    );

    return data;
  }
}
