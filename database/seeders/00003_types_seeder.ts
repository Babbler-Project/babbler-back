import { BaseSeeder } from '@adonisjs/lucid/seeders'

import Type from '#models/type'

export default class TypeSeeder extends BaseSeeder {
  async run() {
    const uniqueKey = 'id'
    await Type.updateOrCreateMany(uniqueKey, [
      {
        id: 1,
        type: 'Frontend',
      },
      {
        id: 2,
        type: 'Backend',
      },
      {
        id: 3,
        type: 'DevOps',
      },
      {
        id: 4,
        type: 'Mobile',
      },
      {
        id: 5,
        type: 'UX/UI',
      },
      {
        id: 6,
        type: 'Data Science',
      },
      {
        id: 7,
        type: 'Machine Learning',
      },
      {
        id: 8,
        type: 'Security',
      },
      {
        id: 9,
        type: 'Architecture',
      },
      {
        id: 10,
        type: 'Languages',
      },
      {
        id: 11,
        type: 'Other',
      },
    ])
  }
}
