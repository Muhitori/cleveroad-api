import { IsEmail, IsNotEmpty } from 'class-validator'
export class LoginUserDto {
  public id: number

  @IsEmail()
  @IsNotEmpty()
  public email: string

  @IsNotEmpty()
  public password: string
}
