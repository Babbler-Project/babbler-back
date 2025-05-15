import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasOne } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasOne } from '@adonisjs/lucid/types/relations'
import Status from '#models/status'
import Level from '#models/level'
import User from '#models/user'
import Type from './type.js'
import Planning from './planning.js'

export default class Talk extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare description: string

  @column({ serializeAs: null })
  declare speakerId: number

  @belongsTo(() => User, {
    foreignKey: 'speakerId',
  })
  declare speaker: BelongsTo<typeof User>

  @column()
  declare duration: number

  @column()
  declare messageFeedback: string

  @column({ serializeAs: null })
  declare statusId: number

  @belongsTo(() => Status)
  declare status: BelongsTo<typeof Status>

  @column({ serializeAs: null })
  declare levelId: number

  @belongsTo(() => Level)
  declare level: BelongsTo<typeof Level>

  @column({ serializeAs: null })
  declare typeId: number

  @belongsTo(() => Type)
  declare type: BelongsTo<typeof Type>

  @hasOne(() => Planning)
  declare planning: HasOne<typeof Planning>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
