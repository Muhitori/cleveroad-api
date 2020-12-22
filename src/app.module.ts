import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PassportModule } from '@nestjs/passport'
import { APP_GUARD, Reflector } from '@nestjs/core'
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard'
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ItemsModule } from './items/items.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    AuthModule,
    UsersModule,
    ItemsModule,
    PassportModule.register({ session: true })
  ],
  providers: [
    {
      provide: APP_GUARD,
      useFactory: (ref) => new JwtAuthGuard(ref),
      inject: [Reflector]
    }
  ]
})
export class AppModule {}
