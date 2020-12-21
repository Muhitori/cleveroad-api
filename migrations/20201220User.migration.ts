import {
  MigrationInterface,
  QueryRunner,
  Table,
} from 'typeorm'

export class UserMigration20201220235632 implements MigrationInterface {
  private tableName: string = 'users'
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          {
            name: 'id',
            type: 'int',
            isGenerated: true,
            generationStrategy: 'increment',
            isPrimary: true
          },
          {
            name: 'email',
            type: 'varchar',
            length: '255',
            isUnique: true,
            isNullable: false
          },
          {
            name: 'name',
            type: 'varchar',
            length: '255',
            isUnique: true,
            isNullable: false
          },
          {
            name: 'phone',
            type: 'varchar',
            length: '15',
            isNullable: true
          },
          {
            name: 'password',
            type: 'varchar',
            length: '255',
            isNullable: false
          }
        ]
      })
    )

    const user = {
      email: 'admin@ad.min',
      name: 'admin',
      phone: '+308965501776',
      password: 'admin'
    }

    await queryRunner.query(
      `INSERT INTO ${this.tableName}(email, name, phone, password)
      VALUES ('${user.email}', '${user.name}', '${user.phone}', '${user.password}');`,
    )
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName)
  }
}
