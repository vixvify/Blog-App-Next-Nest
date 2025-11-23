import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BlogDTO } from 'DTO/blog.dto';
import { FullblogDTO } from 'DTO/fullblog.dto';

@Injectable()
export class DataService {
  constructor(private prismaservice: PrismaService) {}

  async getData() {
    try {
      const data: FullblogDTO[] | null =
        await this.prismaservice.blog.findMany();
      return { status: 200, data };
    } catch (err) {
      return { status: 400, error: err };
    }
  }
  async createData(data: BlogDTO) {
    try {
      await this.prismaservice.blog.create({
        data: {
          title: data.title,
          content: data.content,
          author: data.author,
          userId: data.userId,
        },
      });
      return { status: 201, msg: 'Post Complete' };
    } catch (err) {
      return { status: 400, error: err };
    }
  }
  async getSingleData(id: string) {
    try {
      const data: FullblogDTO | null = await this.prismaservice.blog.findUnique(
        { where: { id } },
      );
      return { status: 200, data };
    } catch (err) {
      return { status: 400, error: err };
    }
  }
  async updateData(id: string, data: BlogDTO) {
    try {
      await this.prismaservice.blog.update({ where: { id }, data });
      return { status: 200, msg: 'Update Complete' };
    } catch (err) {
      return { status: 400, error: err };
    }
  }
  async deleteData(id: string) {
    try {
      await this.prismaservice.blog.delete({ where: { id } });
      return { status: 200, msg: 'Delete Complete' };
    } catch (err) {
      return { status: 400, error: err };
    }
  }
}
