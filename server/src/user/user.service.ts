import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDTO } from 'DTO/signup.dto';
import { LoginDTO } from 'DTO/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(
    private prismaservice: PrismaService,
    private jwt: JwtService,
  ) {}

  async signup(data: RegisterDTO) {
    try {
      const { password } = data;
      const hashpass = await bcrypt.hash(password, 10);
      await this.prismaservice.user.create({
        data: {
          username: data.username,
          email: data.email,
          password: hashpass,
        },
      });
      return { status: 201, msg: 'Sign up Complete' };
    } catch (err) {
      throw err;
    }
  }
  async login(data: LoginDTO) {
    try {
      const { email, password } = data;
      const user = await this.prismaservice.user.findUnique({
        where: { email },
      });
      if (!user) {
        throw new HttpException(
          "Don't have any account",
          HttpStatus.BAD_REQUEST,
        );
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new HttpException('Wrong password', HttpStatus.BAD_REQUEST);
      }

      const token = this.jwt.sign({
        id: user.id,
        username: user.username,
        email: user.email,
      });
      return { status: 200, user, token, msg: 'Login Complete' };
    } catch (err) {
      throw err;
    }
  }
}
