import Room from '#models/room'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class RoomSeeder extends BaseSeeder {
  async run() {
    const uniqueKey = 'name'
    await Room.updateOrCreateMany(uniqueKey, [
      {
        name: 'Salle Turing',
        capacity: 100,
      },
      {
        name: 'Salle Hopper',
        capacity: 150,
      },
      {
        name: 'Salle Lovelace',
        capacity: 80,
      },
      {
        name: 'Salle Berners-Lee',
        capacity: 120,
      },
      {
        name: 'Salle Torvalds',
        capacity: 200,
      },
    ])
  }
}
