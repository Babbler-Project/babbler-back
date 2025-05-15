import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Talk from '#models/talk'

export default class Status extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare label: string

  @hasMany(() => Talk)
  declare talks: HasMany<typeof Talk>

  @column.dateTime({ autoCreate: true, serializeAs: null })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  declare updatedAt: DateTime
}
