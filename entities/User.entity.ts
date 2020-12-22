import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  public id: number

  @Column('varchar')
  public email: string;

  @Column('varchar')
  public name: string;

  @Column('varchar')
  public phone: string;

  @Column('varchar')
  public password: string;

  constructor(
    email: string,
    name: string,
    phone: string,
    password: string,
  ) {
    this.email = email
    this.name = name
    this.phone = phone
    this.password = password
  }
}
