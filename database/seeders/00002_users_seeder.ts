import { BaseSeeder } from '@adonisjs/lucid/seeders'

import User from '#models/user'
import hash from '@adonisjs/core/services/hash'

import env from '#start/env'

export default class UserSeeder extends BaseSeeder {
  async run() {
    const adminEmail = env.get('ADMIN_EMAIL')
    const adminPassword = env.get('ADMIN_PASSWORD')
    const userEmail = env.get('USER_EMAIL')
    const userPassword = env.get('USER_PASSWORD')

    const uniqueKey = 'email'
    await User.updateOrCreateMany(uniqueKey, [
      {
        email: adminEmail,
        password: await hash.make(adminPassword),
        roleId: 2,
      },
      {
        email: userEmail,
        password: await hash.make(userPassword),
        roleId: 1,
      },
    ])
  }
}
