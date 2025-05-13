import Status from '#models/status'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class StatusSeeder extends BaseSeeder {
  async run() {
    const uniqueKey = 'id'
    await Status.updateOrCreateMany(uniqueKey, [
      {
        id: 1,
        status: 'Pending',
      },
      {
        id: 2,
        status: 'Planed',
      },
      {
        id: 3,
        status: 'Refused',
      },
    ])
  }
}
