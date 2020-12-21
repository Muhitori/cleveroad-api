import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';

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

  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 2);
  }

  async unecryptedPasswordIsValid(password: string) {
    return await bcrypt.compare(password, this.password);
  }
}
