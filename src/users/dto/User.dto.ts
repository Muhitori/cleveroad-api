import { IsEmail, IsNotEmpty } from 'class-validator'
export class UserDto {
  public id: number

  @IsEmail()
  @IsNotEmpty()
  public email: string

  @IsNotEmpty()
  public name: string

  public phone: string

  @IsNotEmpty()
  public password: string
}
