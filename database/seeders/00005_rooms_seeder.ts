import Room from '#models/room'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class RoomSeeder extends BaseSeeder {
  async run() {
    const uniqueKey = 'id'
    await Room.updateOrCreateMany(uniqueKey, [
      {
        id: 1,
        name: 'Salle Turing',
        capacity: 100,
      },
      {
        id: 2,
        name: 'Salle Hopper',
        capacity: 150,
      },
      {
        id: 3,
        name: 'Salle Lovelace',
        capacity: 80,
      },
      {
        id: 4,
        name: 'Salle Berners-Lee',
        capacity: 120,
      },
      {
        id: 5,
        name: 'Salle Torvalds',
        capacity: 200,
      },
    ])
  }
}
