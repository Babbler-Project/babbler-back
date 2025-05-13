import Level from '#models/level'

export default class LevelSeeder {
  public async run() {
    // Liste des niveaux par défaut
    const levels = ['Débutant', 'Intermédiaire', 'Avancé']

    for (const levelName of levels) {
      // Vérifier si le niveau existe déjà
      const existingLevel = await Level.query().where('level', levelName).first()

      if (!existingLevel) {
        // Créer le niveau si il n'existe pas déjà
        await Level.create({ level: levelName })
      }
    }
  }
}
