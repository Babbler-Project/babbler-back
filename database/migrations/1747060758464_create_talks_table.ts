import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'talks'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title').notNullable()
      table.string('description').notNullable()
      table.integer('speaker_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('duration').notNullable()
      table.string('manage_feedback').nullable()

      table.integer('status_id').unsigned().references('id').inTable('statuses').onDelete('CASCADE')

      table.integer('level_id').unsigned().references('id').inTable('levels').onDelete('CASCADE')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
