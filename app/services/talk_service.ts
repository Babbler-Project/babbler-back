import { TalkStatus } from '#enums/talks_enums'
import Level from '#models/level'
import Status from '#models/status'
import Talk from '#models/talk'
import Type from '#models/type'
import User from '#models/user'
import { AuthorizationException } from '#exceptions/authorization_exeption'

export default class TalkService {
  public async getAllMyTalk(speaker: User): Promise<Talk[]> {
    return Talk.query()
      .where('speaker_id', speaker.id)
      .preload('status')
      .preload('level')
      .preload('type')
      .preload('planning', (planningQuery) => {
        planningQuery.select(['id', 'startTime', 'endTime', 'roomId'])
        planningQuery.preload('room', (roomQuery) => {
          roomQuery.select(['id', 'name'])
        })
      })
  }

  public async getAllPendingTalks(): Promise<Talk[]> {
    return Talk.query()
      .where('status_id', TalkStatus.PENDING)
      .preload('status')
      .preload('level')
      .preload('type')
      .preload('speaker')
      .preload('planning')
  }

  public async createTalk(
    talk: Talk,
    speakerId: number,
    levelId: number,
    typeId: number
  ): Promise<Talk> {
    const speaker = await User.findOrFail(speakerId)
    const level = await Level.findOrFail(levelId)
    const type = await Type.findOrFail(typeId)
    const status = await Status.findOrFail(TalkStatus.PENDING)

    await talk.related('speaker').associate(speaker)
    await talk.related('level').associate(level)
    await talk.related('type').associate(type)
    await talk.related('status').associate(status)
    return await talk.save()
  }

  public async findById(id: number) {
    const talk = await Talk.findOrFail(id)
    await talk.load('level')
    await talk.load('type')
    await talk.load('status')
    return talk
  }

  public async updateTalk(
    talk: Talk,
    speakedId: number,
    levelId: number,
    typeId: number
  ): Promise<Talk> {
    const talkToUpdate = await Talk.query().where('id', talk.id).preload('status').firstOrFail()

    if (talkToUpdate.speakerId !== speakedId) {
      throw new AuthorizationException()
    }

    if (talkToUpdate.status.id !== TalkStatus.PENDING) {
      throw new AuthorizationException('You can not update a talk that is not pending')
    }

    const level = await Level.findOrFail(levelId)
    const type = await Type.findOrFail(typeId)

    await talkToUpdate.related('level').associate(level)
    await talkToUpdate.related('type').associate(type)

    talkToUpdate.title = talk.title
    talkToUpdate.description = talk.description
    talkToUpdate.duration = talk.duration

    await talkToUpdate.save()
    await talkToUpdate.load('status')
    await talkToUpdate.load('level')
    await talkToUpdate.load('type')
    return talkToUpdate
  }

  public async refusedTalk(talk: Talk): Promise<Talk> {
    const talkToUpdate = await Talk.findOrFail(talk.id)
    const status = await Status.findOrFail(TalkStatus.REFUSED)

    await talkToUpdate.related('status').associate(status)

    talkToUpdate.messageFeedback = talk.messageFeedback

    await talkToUpdate.save()
    await talkToUpdate.load('status')
    return talkToUpdate
  }

  public async deleteTalk(id: number): Promise<Talk> {
    const talk = await Talk.findOrFail(id)
    await talk.delete()
    return talk
  }
}
