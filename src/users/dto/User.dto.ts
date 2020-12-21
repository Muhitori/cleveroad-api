export class UserDto {
  public id: number

  public email: string

  public name: string

  public phone: string

  public password: string

  constructor(email: string, name: string, phone: string, password: string) {
    this.email = email
    this.name = name
    this.phone = phone
    this.password = password
  }
}
