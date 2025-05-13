import Talk from '#models/talk'
import User from '#models/user'
import { DateTime } from 'luxon'

export default class TalkService {
  public async listAll() {
    return Talk.query().preload('status').preload('level').preload('user')
  }

  public async create(payload: any) {
    const speaker = await User.find(payload.speaker)
    if (!speaker) {
      throw new Error('Speaker not found')
    }

    const talkDuration = DateTime.fromISO(payload.duration)
    if (!talkDuration.isValid) {
      throw new Error('Invalid duration format')
    }

    const talk = await Talk.create({
      ...payload,
      duration: talkDuration,
    })

    await talk.load('status')
    await talk.load('level')
    await talk.load('user')

    return talk
  }

  public async findById(id: number) {
    const talk = await Talk.find(id)
    if (!talk) return null

    await talk.load('status')
    await talk.load('level')
    await talk.load('user')
    return talk
  }

  public async update(id: number, payload: any) {
    const talk = await Talk.find(id)
    if (!talk) return null

    const speaker = await User.find(payload.speaker)
    if (!speaker) {
      throw new Error('Speaker not found')
    }

    const duration = payload.duration
      ? DateTime.fromISO(payload.duration)
      : undefined

    if (duration && !duration.isValid) {
      throw new Error('Invalid duration format')
    }

    talk.merge({
      ...payload,
      duration,
    })
    await talk.save()
    await talk.load('status')
    await talk.load('level')
    await talk.load('user')

    return talk
  }

  public async delete(id: number) {
    const talk = await Talk.find(id)
    if (!talk) return null
    await talk.delete()
    return true
  }
}
