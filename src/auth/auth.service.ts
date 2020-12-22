import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from 'src/users/dto/LoginUser.dto';
import { UserDto } from 'src/users/dto/User.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findByEmail(email)

    if (!user) {
      throw new UnprocessableEntityException({
        field: 'email',
        message: 'Wrong email'
      })
    }

    if (user.password != pass) {
      throw new UnprocessableEntityException({
        field: 'email',
        message: 'Wrong password'
      })
    }

    const { password, ...result } = user
    return result
  }

  async login(loginUser: LoginUserDto): Promise<any> {
    const user = await this.userService.findByEmail(loginUser.email)
    const payload = { email: user.email, sub: user.id }

    return {
      token: this.jwtService.sign(payload)
    }
  }

  async register(user: UserDto): Promise<any> {
    const registered = await this.userService.createUser(user)

    if (!registered)
      throw new UnprocessableEntityException()
    
    const payload = { name: user.name, sub: user.id }

    return {
      token: this.jwtService.sign(payload)
    }
  }

  async getCurrentUser({ id }: UserDto) {
    const {password, ...user} = await this.userService.getUserById(id)
    return user;
  }
}
