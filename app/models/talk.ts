import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Status from '#models/status'
import Level from '#models/level'
import User from '#models/user' // Assurez-vous d'importer le modèle User

export default class Talk extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare description: string

  @column()
  declare speaker: number

  @belongsTo(() => User, {
    foreignKey: 'speaker',  
  })
  declare user: BelongsTo<typeof User>

  @column()
  declare duration: DateTime

  @column()
  declare manageFeedback: string

  @column()
  declare statusId: number

  @belongsTo(() => Status)
  declare status: BelongsTo<typeof Status>

  @column()
  declare levelId: number

  @belongsTo(() => Level)
  declare level: BelongsTo<typeof Level>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
