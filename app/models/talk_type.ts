import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Type from '#models/type'
import Talk from '#models/talk'

export default class TalkType extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare typeId: number

  @belongsTo(() => Type)
  declare type: BelongsTo<typeof Type>

  @column()
  declare talkId: number

  @belongsTo(() => Talk)
  declare talk: BelongsTo<typeof Talk>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
