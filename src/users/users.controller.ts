import { Controller, Headers, Get, Req, UseGuards } from '@nestjs/common'
import { Request } from 'express'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUsers(@Req() request: Request) {
    return this.usersService.findAll()
  }
}
