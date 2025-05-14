import Level from '#models/level'

export default class LevelSeeder {
  public async run() {
    const levels = ['Beginer', 'Advanced', 'Expert']

    for (const levelName of levels) {
      const existingLevel = await Level.query().where('label', levelName).first()

      if (!existingLevel) {
        await Level.create({ label: levelName })
      }
    }
  }
}
