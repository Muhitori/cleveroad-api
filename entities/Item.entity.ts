import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
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
  public userId: number

  @CreateDateColumn({ type: 'timestamp' })
  public created_at: Date

  @ManyToOne(() => Item, (item) => item.user)
  public user: User

  constructor(title: string, price: number, image: string, userId: number) {
    this.title = title
    this.price = price
    this.image = image
    this.userId = userId
  }
}
