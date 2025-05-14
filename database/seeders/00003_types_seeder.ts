import { BaseSeeder } from '@adonisjs/lucid/seeders'

import Type from '#models/type'

export default class TypeSeeder extends BaseSeeder {
  async run() {
    const uniqueKey = 'label'
    await Type.updateOrCreateMany(uniqueKey, [
      {
        label: 'Frontend',
      },
      {
        label: 'Backend',
      },
      {
        label: 'DevOps',
      },
      {
        label: 'Mobile',
      },
      {
        label: 'UX/UI',
      },
      {
        label: 'Data Science',
      },
      {
        label: 'Machine Learning',
      },
      {
        label: 'Security',
      },
      {
        label: 'Architecture',
      },
      {
        label: 'Languages',
      },
      {
        label: 'Other',
      },
    ])
  }
}
