import { BaseSeeder } from '@adonisjs/lucid/seeders'
import TalkType from '#models/talk_type'
import Type from '#models/type'
import Talk from '#models/talk'

export default class TalkTypeSeeder extends BaseSeeder {
  async run() {
    // Récupérer les types et les conférences
    const types = await Type.all()
    const talks = await Talk.all()

    // Exemple de liaisons de types avec des talks (modifiez selon vos besoins)
    for (const type of types) {
      for (const talk of talks) {
        // Associer chaque talk à chaque type (vous pouvez personnaliser la logique ici)
        await TalkType.updateOrCreate(
          { talkId: talk.id, typeId: type.id }, // Assurez-vous que la combinaison talkId/typeId est unique
          {
            talkId: talk.id,
            typeId: type.id,
          }
        )
      }
    }
  }
}
