import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/users/dto/User.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) { }
  
  async validateUser(name: string, password: string): Promise<any> {
    const user = await this.userService.findByName(name);

    if (user && user.password == password) {
      const { password, ...result } = user;
      return result;
    }

    return null
  }

  async login(user: UserDto): Promise<any> {
    const payload = { name: user.name, sub: user.id }
    
    return {
      accessToken: this.jwtService.sign(payload)
    }
  }
}
