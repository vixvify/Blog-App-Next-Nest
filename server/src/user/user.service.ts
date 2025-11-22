import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDTO } from 'DTO/user.dto';
import { LoginDTO } from 'DTO/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    private prismaservice: PrismaService,
    private jwt: JwtService,
  ) {}

  async signup(data: UserDTO) {
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
      return { status: 400, error: err };
    }
  }
  async login(data: LoginDTO) {
    try {
      const { email, password } = data;
      const user = await this.prismaservice.user.findUnique({
        where: { email },
      });
      if (!user) return null;

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return {
          status: 400,
          msg: 'Wrong password',
        };

      const token = this.jwt.sign({
        id: user.id,
        username: user.username,
        email: user.email,
      });
      return { status: 200, user, token, msg: 'Login Complete' };
    } catch (err) {
      return { status: 400, error: err };
    }
  }
}
