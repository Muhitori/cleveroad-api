import { Controller, Post, Body, UseGuards, Req, Get } from '@nestjs/common'
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UserDto } from 'src/users/dto/User.dto'
import { LoginUserDto } from 'src/users/dto/LoginUser.dto';
import { Request } from 'express';
import { Public } from 'src/public.decorator';

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() user: LoginUserDto) {
    return await this.authService.login(user)
  }

  @Public()
  @Post('register')
  async register(@Body() user: UserDto) {
    return this.authService.register(user)
  }

  @Get('me')
  async Me(@Req() request: Request) {
    return this.authService.getCurrentUser(<UserDto>request.user)
  }
}
