import { IsDate } from 'class-validator'
import { UserDto } from 'src/users/dto/User.dto'

export class ItemDto {
  public id: number

  public title: string

  public price: number

  public image: string

  public user_id: number

  @IsDate()
  public created_at: Date

  public user: UserDto
}
