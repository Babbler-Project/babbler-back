import app from '@adonisjs/core/services/app'
import RoomService from '#services/room_service'
import { test } from '@japa/runner'
import Room from '#models/room'
import { RoomDTO } from '#types/room_types'

test.group('Room controller', (group) => {
  group.setup(() => {
    // Crée un mock du service
    const mockRoomService = {
      getAll: async () =>
        [
          { id: 1, name: 'Room A' },
          { id: 2, name: 'Room B' },
        ] as Room[],
      getRoomById: async (id: number) => {
        return { id, name: `Room ${id}` } as Room
      },
      createRoom: async (roomDto: RoomDTO) => {
        return { id: 3, ...roomDto } as Room
      },
      updateRoom: async (id: number, roomDto: RoomDTO) => {
        return { id, ...roomDto } as Room
      },
      deleteRoom: async (id: number) => {
        return { id, name: `Room ${id}` } as Room
      },
    }

    // Remplace le vrai service par le mock dans le container
    app.container.bind(RoomService, () => mockRoomService)
  })

  test('it should return mocked rooms', async ({ client, assert }) => {
    const response = await client.get('/api/v1/organizers/rooms')

    response.assertStatus(200)
    const body = response.body()

    assert.isArray(body)
    assert.lengthOf(body, 2)

    assert.deepInclude(body, { id: 1, name: 'Room A' })
    assert.deepInclude(body, { id: 2, name: 'Room B' })
  })

  test('it should return one mocked room', async ({ client, assert }) => {
    const response = await client.get('/api/v1/organizers/rooms/5')

    response.assertStatus(200)
    const body = response.body()

    assert.deepEqual(body, { id: 5, name: 'Room 5' })
  })

  test('it should create a new room', async ({ client, assert }) => {
    const response = await client.post('/api/v1/organizers/rooms').json({
      name: 'New Room',
      capacity: 20,
    })

    response.assertStatus(201)
    const body = response.body()

    assert.deepEqual(body, {
      id: 3,
      name: 'New Room',
      capacity: 20,
    })
  })

  test('it should update a room', async ({ client, assert }) => {
    const response = await client.put('/api/v1/organizers/rooms/10').json({
      name: 'Updated Room',
      capacity: 30,
    })

    response.assertStatus(200)
    const body = response.body()

    assert.deepEqual(body, {
      id: 10,
      name: 'Updated Room',
      capacity: 30,
    })
  })

  test('it should delete a room', async ({ client, assert }) => {
    const response = await client.delete('/api/v1/organizers/rooms/20')

    response.assertStatus(200)
    const body = response.body()

    assert.deepEqual(body, { id: 20, name: 'Room 20' })
  })
})
