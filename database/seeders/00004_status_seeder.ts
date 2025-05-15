import Status from '#models/status'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class StatusSeeder extends BaseSeeder {
  async run() {
    const uniqueKey = 'id'
    await Status.updateOrCreateMany(uniqueKey, [
      {
        id: 1,
        label: 'Pending',
      },
      {
        id: 2,
        label: 'Planed',
      },
      {
        id: 3,
        label: 'Refused',
      },
    ])
  }
}
