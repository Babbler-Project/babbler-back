import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'plannings'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('talk_id')
        .unsigned()
        .references('id')
        .inTable('talks')
        .onDelete('CASCADE') 
      table
        .integer('room_id')
        .unsigned()
        .references('id')
        .inTable('rooms')
        .onDelete('CASCADE') 

      table.timestamp('start_time').notNullable()
      table.timestamp('end_time').notNullable()
      table.integer('count_places').notNullable()
      table.boolean('is_full').defaultTo(false)

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}