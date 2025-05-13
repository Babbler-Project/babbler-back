import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Talk from '#models/talk'
import User from '#models/user'
import Status from '#models/status'
import Level from '#models/level'
import { DateTime } from 'luxon'

export default class TalkSeeder extends BaseSeeder {
  async run() {
    const users = await User.all()
    const statuses = await Status.all()
    const levels = await Level.all()

    const talks = [
      {
        id: 1,
        title: 'Introduction à la programmation backend',
        description: 'Apprenez les bases du développement backend avec Node.js et Adonis.',
        speaker: users[0].id,
        duration: new Date('2025-06-10T01:00:00Z'),
        manageFeedback: 'Oui',
        statusId: statuses[0].id,
        levelId: levels[0].id,
      },
      {
        id: 2,
        title: 'Mastering Frontend Development',
        description: 'Explorez les dernières tendances et technologies du développement frontend.',
        speaker: users[1].id,
        duration: new Date('2025-06-12T02:00:00Z'),
        manageFeedback: 'Non',
        statusId: statuses[1].id,
        levelId: levels[1].id,
      },
      {
        id: 3,
        title: 'Design Thinking pour le développement logiciel',
        description: 'Une session pratique sur la méthodologie Design Thinking.',
        speaker: users[2].id,
        duration: new Date('2025-06-15T03:00:00Z'),
        manageFeedback: 'Oui',
        statusId: statuses[2].id,
        levelId: levels[0].id,
      },
    ]

    for (const talkData of talks) {
      await Talk.updateOrCreate(
        { id: talkData.id },
        {
          ...talkData,
          duration: DateTime.fromJSDate(talkData.duration),
        }
      )
    }
  }
}
