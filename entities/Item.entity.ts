import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { User } from './User.entity'

@Entity('items')
export class Item {
  @PrimaryGeneratedColumn()
  public id: number

  @Column('varchar')
  public title: string

  @Column('double')
  public price: number

  @Column('varchar')
  public image: string

  @Column('int')
  public user_id: number

  @CreateDateColumn({ type: 'timestamp' })
  public created_at: Date

  @ManyToOne(() => Item, (item) => item.user)
  public user: User

  constructor(title: string, price: number, image: string, user_id: number) {
    this.title = title
    this.price = price
    this.image = image
    this.user_id = user_id
  }
}
