import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common'
import { AuthService } from './auth/auth.service'
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from './auth/guards/local-auth.guard'
import { UsersService } from './users/users.service';


@Controller()
export class AppController {

  constructor(
    private authService: AuthService,
    private userService: UsersService
  ) { }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() request) {
    return this.authService.login(request.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/users')
  async getUser(@Request() request) {
    return this.userService.findAll()
  }
}
