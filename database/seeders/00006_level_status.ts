import Level from '#models/level'

export default class LevelSeeder {
  public async run() {
    const levels = ['Débutant', 'Intermédiaire', 'Avancé']

    for (const levelName of levels) {
      const existingLevel = await Level.query().where('level', levelName).first()

      if (!existingLevel) {
        await Level.create({ level: levelName })
      }
    }
  }
}
