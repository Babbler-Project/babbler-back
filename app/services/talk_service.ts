import Level from '#models/level'
import Status from '#models/status'
import Talk from '#models/talk'
import User from '#models/user'

export default class TalkService {
  public async getAll(): Promise<Talk[]> {
    return Talk.query().preload('status').preload('level').preload('speaker')
  }

  public async createTalk(talk: Talk, speakerId: number, levelId: number): Promise<Talk> {
    const speaker = await User.findOrFail(speakerId)
    const level = await Level.findOrFail(levelId)
    const status = await Status.findOrFail(1)

    await talk.related('speaker').associate(speaker)
    await talk.related('level').associate(level)
    await talk.related('status').associate(status)
    return await talk.save()
  }

  public async findById(id: number) {
    const talk = await Talk.findOrFail(id)
    await talk.load('speaker')
    await talk.load('level')
    await talk.load('status')
    return talk
  }

  public async updateTalk(talk: Talk, levelId: number): Promise<Talk> {
    const talkToUpdate = await Talk.findOrFail(talk.id)
    const level = await Level.findOrFail(levelId)

    await talkToUpdate.related('level').associate(level)

    talkToUpdate.title = talk.title
    talkToUpdate.description = talk.description
    talkToUpdate.duration = talk.duration

    await talkToUpdate.save()
    await talkToUpdate.load('status')
    await talkToUpdate.load('level')
    await talkToUpdate.load('speaker')
    return talkToUpdate
  }

  public async deleteTalk(id: number): Promise<Talk> {
    const talk = await Talk.findOrFail(id)
    await talk.delete()
    return talk
  }
}
