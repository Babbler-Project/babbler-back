import { BaseSeeder } from '@adonisjs/lucid/seeders'

import User from '#models/user'

import env from '#start/env'

export default class UserSeeder extends BaseSeeder {
  async run() {
    const adminEmail = env.get('ADMIN_EMAIL')
    const adminPassword = env.get('ADMIN_PASSWORD')
    const userEmail = env.get('USER_EMAIL')
    const userPassword = env.get('USER_PASSWORD')
    const speakerEmail = env.get('SPEAKER_EMAIL')
    const speakerPassword = env.get('SPEAKER_PASSWORD')

    const uniqueKey = 'email'
    await User.updateOrCreateMany(uniqueKey, [
      {
        email: adminEmail,
        password: adminPassword,
        roleId: 2,
      },
      {
        email: userEmail,
        password: userPassword,
        roleId: 1,
      },
      {
        email: speakerEmail,
        password: speakerPassword,
        roleId: 3,
      },
    ])
  }
}
