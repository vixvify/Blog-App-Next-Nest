import { Controller } from '@nestjs/common';
import { Post, Body } from '@nestjs/common/decorators';
import { RegisterDTO } from 'DTO/signup.dto';
import { LoginDTO } from 'DTO/login.dto';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(private userservice: UserService) {}

  @Post('/signup')
  createUser(@Body() data: RegisterDTO) {
    return this.userservice.signup(data);
  }

  @Post('/login')
  login(@Body() data: LoginDTO) {
    return this.userservice.login(data);
  }
}
