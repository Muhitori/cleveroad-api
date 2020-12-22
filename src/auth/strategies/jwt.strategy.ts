import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Request } from 'express'
import { Strategy } from 'passport-jwt'
import { jwtConstants } from '../constants'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor() {
    const tokenExtractor = (req: Request) => {
      return req.header('Authorization')
    }

    super({
      jwtFromRequest: tokenExtractor,
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret
    })
  }

  async validate(payload: any) {
    return {id: payload.sub, name: payload.name}
  }
}