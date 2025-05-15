import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'talks'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title').notNullable()
      table.string('description').notNullable()
      table.integer('duration').notNullable()
      table.string('message_feedback').nullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.integer('speaker_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('status_id').unsigned().references('id').inTable('statuses').onDelete('CASCADE')
      table.integer('level_id').unsigned().references('id').inTable('levels').onDelete('CASCADE')
      table.integer('type_id').unsigned().references('id').inTable('types').onDelete('CASCADE')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
