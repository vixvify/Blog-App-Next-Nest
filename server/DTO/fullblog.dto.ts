import { IsString, IsNotEmpty } from 'class-validator';

export class FullblogDTO {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsString()
  @IsNotEmpty()
  createdAt: Date;

  @IsString()
  @IsNotEmpty()
  userId: string;
}
