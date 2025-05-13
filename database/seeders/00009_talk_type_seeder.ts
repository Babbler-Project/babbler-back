import { BaseSeeder } from '@adonisjs/lucid/seeders'
import TalkType from '#models/talk_type'
import Type from '#models/type'
import Talk from '#models/talk'

export default class TalkTypeSeeder extends BaseSeeder {
  async run() {
    const types = await Type.all()
    const talks = await Talk.all()

    for (const type of types) {
      for (const talk of talks) {
        await TalkType.updateOrCreate(
          { talkId: talk.id, typeId: type.id },
          {
            talkId: talk.id,
            typeId: type.id,
          }
        )
      }
    }
  }
}
