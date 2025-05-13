import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Talk from '#models/talk'
import User from '#models/user'
import Status from '#models/status'
import Level from '#models/level'
import { DateTime } from 'luxon'

export default class TalkSeeder extends BaseSeeder {
  async run() {
    // Récupérer des utilisateurs, statuts et niveaux
    const users = await User.all()
    const statuses = await Status.all()
    const levels = await Level.all()

    console.log(users)

    // Créer des conférences (talks) avec des données par défaut
    const talks = [
      {
        id: 1, // ID spécifié pour la conférence
        title: 'Introduction à la programmation backend',
        description: 'Apprenez les bases du développement backend avec Node.js et Adonis.',
        speaker: users[0].id, // Associe le premier utilisateur comme speaker
        duration: new Date('2025-06-10T01:00:00Z'),
        manageFeedback: 'Oui',
        statusId: statuses[0].id, // Statut 'En attente'
        levelId: levels[0].id, // Niveau 'Débutant'
      },
      {
        id: 2, // ID spécifié pour la conférence
        title: 'Mastering Frontend Development',
        description: 'Explorez les dernières tendances et technologies du développement frontend.',
        speaker: users[1].id, // Associe le deuxième utilisateur comme speaker
        duration: new Date('2025-06-12T02:00:00Z'),
        manageFeedback: 'Non',
        statusId: statuses[1].id, // Statut 'Confirmé'
        levelId: levels[1].id, // Niveau 'Avancé'
      },
      {
        id: 3, // ID spécifié pour la conférence
        title: 'Design Thinking pour le développement logiciel',
        description: 'Une session pratique sur la méthodologie Design Thinking.',
        speaker: users[2].id, // Associe le troisième utilisateur comme speaker
        duration: new Date('2025-06-15T03:00:00Z'),
        manageFeedback: 'Oui',
        statusId: statuses[2].id, // Statut 'Rejeté'
        levelId: levels[0].id, // Niveau 'Débutant'
      },
    ]

    // Insérer les conférences dans la table avec les IDs
    for (const talkData of talks) {
      await Talk.updateOrCreate(
        { id: talkData.id }, // Utilise l'ID comme clé unique
        {
          ...talkData,
          duration: DateTime.fromJSDate(talkData.duration),
        }
      )
    }
  }
}
