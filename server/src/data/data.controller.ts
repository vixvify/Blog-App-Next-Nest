import { Controller } from '@nestjs/common';
import { Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { DataService } from './data.service';
import { BlogDTO } from 'DTO/blog.dto';

@Controller('data')
export class DataController {
  constructor(private dataservice: DataService) {}
  @Get('getData')
  getData() {
    return this.dataservice.getData();
  }

  @Get('getSingleData/:id')
  getSingleData(@Param('id') id: string) {
    return this.dataservice.getSingleData(id);
  }

  @Post('createData')
  createData(@Body() data: BlogDTO) {
    return this.dataservice.createData(data);
  }

  @Put('updateData/:id')
  updateData(@Param('id') id: string, @Body() data: BlogDTO) {
    return this.dataservice.updateData(id, data);
  }

  @Delete('deleteData/:id')
  deleteData(@Param('id') id: string) {
    return this.dataservice.deleteData(id);
  }
}
