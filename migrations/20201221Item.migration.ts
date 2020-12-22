import {
  MigrationInterface,
  QueryRunner,
  Table,
} from 'typeorm'
import { User } from '../entities/User.entity'

export class ItemMigration20201221235632 implements MigrationInterface {
  private tableName: string = 'items'
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
            name: 'title',
            type: 'varchar',
            length: '255',
            isNullable: false
          },
          {
            name: 'price',
            type: 'double',
            isNullable: false
          },
          {
            name: 'image',
            type: 'varchar',
            length: '255',
            isNullable: true
          },
          {
            name: 'user_id',
            type: 'int',
            isNullable: true
          },
          {
            name: 'created_at',
            type: 'TIMESTAMP',
            default: 'now()',
            isNullable: false
          }
        ]
      })
    )

    await queryRunner.query(
      `ALTER TABLE ${this.tableName} ADD CONSTRAINT FK_products_user
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE`
    )

    const [
      {id}
    ]: User[] = await queryRunner.query(
      "SELECT id FROM users WHERE name = 'admin'"
    )
    
    const product = {
      title: 'test',
      price: 550.0,
      image: null,
      user_id: id
    }

    await queryRunner.query(
      `INSERT INTO ${this.tableName} (title, price, image, user_id)
      VALUES ('${product.title}', ${product.price}, ${product.image}, '${product.user_id}');`,
    )
}

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName)
  }
}
