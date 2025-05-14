import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, afterCreate } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Talk from '#models/talk'
import Room from '#models/room'
import { TalkStatus } from '#enums/talks_enums'

export default class Planning extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare talkId: number

  @belongsTo(() => Talk)
  declare talk: BelongsTo<typeof Talk>

  @column()
  declare roomId: number

  @belongsTo(() => Room)
  declare room: BelongsTo<typeof Room>

  @column.dateTime()
  declare startTime: DateTime

  @column.dateTime()
  declare endTime: DateTime

  @column()
  declare countPlaces: number

  @column()
  declare isFull: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @afterCreate()
  public static async updateTalkStatus(planning: Planning) {
    const talk = await Talk.findOrFail(planning.talkId)
    talk.statusId = TalkStatus.APPROVED
    await talk.save()
  }
}
