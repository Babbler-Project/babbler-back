import { BaseSeeder } from '@adonisjs/lucid/seeders'

import Role from '#models/role'

export default class RoleSeeder extends BaseSeeder {
  async run() {
    const uniqueKey = 'id'
    await Role.updateOrCreateMany(uniqueKey, [
      {
        id: 1,
        role: 'User',
      },
      {
        id: 2,
        role: 'Organizer',
      },
      {
        id: 3,
        role: 'Speaker',
      },
    ])
  }
}
